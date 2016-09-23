var zTreeDoc, rMenu;
import stringUtil from './stringUtil';
import gloabl from '../../api/globConfig'
import * as URL from '../../api/restfull'
import 'zTree/css/metroStyle/metroStyle.css'
require('zTree');
var v_this = this;
var vm_this;
var ManageTree = {
  init: function(data, v_this) {
    var _this = this;
    vm_this = v_this;
    RightMenu.getRightManageList(data.id, vm_this);
    //树的整体配置
    var setting = {
      view: {
        showIcon: true,
        dblClickExpand: false,
        showLine: true,
      },
      edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false,
        isCopy: false,
        isMove: false
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        //beforeDrag: _this.beforeDrag,
        //beforeDrop: _this.beforeDrop,
        onRightClick: _this.OnRightClick,
        onClick: _this.onClick,
        onRename: _this.onRename,
      }

    };
    $.fn.zTree.init($("#manage_tree"), setting, data);
    zTreeDoc = $.fn.zTree.getZTreeObj("manage_tree");

    rMenu = $("#rMenu");
    $("#rMenu").unbind("click");
    $("#rMenu").delegate('ul li', 'click', function() {
      var treeType = $(this).data('type');
      if (treeType == 'add') {
        _this.addTreeNode();
      } else if (treeType == 'del') {
        _this.removeTreeNode();
      } else if (treeType == 'rename') {
        _this.renameTree();
      }
    });
  },
  onClick: function(e, treeId, treeNode) {
    zTreeDoc = $.fn.zTree.getZTreeObj("manage_tree");
    var nodes = zTreeDoc.getSelectedNodes();
    zTreeDoc.expandNode(treeNode);
    //ajax获取数据
    var orgSid = nodes[0].id;
    //	console.log(vm_this+'===');
    RightMenu.getRightManageList(orgSid, vm_this);
  },

  ///////////////////添加部门
  addTreeNode: function() {
    var _this = this;
    RightMenu.hideRMenu();
    var nodes = zTreeDoc.getSelectedNodes();
    if (nodes[0] != undefined && nodes[0].level > 4) {
      gloabl.tipTools('部门不能超过7层!')
      return false;
    }
    var name = '';
    var addLayer = gloabl.layer.open({
      title: '部门名称',
      type: 1,
      skin: '',
      btn: ['确定', '取消'],
      content: '<p class="tc p10"><input type="text" class="form-control" id="t_t_name" placeholder="请输入部门名称"></p>',
      yes: function() {
        var val = $('#t_t_name').val();
        if (stringUtil.isSafe(val)) {
          gloabl.tipTools('名称不能含有非法字符')
          return;
        }
        if (stringUtil.valueLength(val) > 16) {
          gloabl.tipTools('名称不能超过8个字!')
          return;
        }
        if (stringUtil.valueLength(val) < 1) {
          gloabl.tipTools('名称不能为空!')
          return;
        }
        gloabl.tipTools('您添加了' + val + '部门');
        name = val;
        var id = "";
        if (nodes[0] == undefined) {
          id = "";
        } else {
          id = nodes[0].id;
        }
        var params = 'TM00101=' + id + '&TM00106=' + val;
        gloabl.fethAsync([URL.ADD_DEPARTMENT_URL], params, res => {
          if (res.success) {
            var data = res.result;
            var newNode = {
              id: data.TM00101,
              name: data.TM00106 + '（0）'
            };
            console.log(res)
            gloabl.layer.close(addLayer);
            if (zTreeDoc.getSelectedNodes()[0]) {
              newNode.checked = zTreeDoc.getSelectedNodes()[0].checked;
              zTreeDoc.addNodes(zTreeDoc.getSelectedNodes()[0], newNode);
            } else {
              zTreeDoc.addNodes(null, newNode);
            }
          }

        });
      }
    })
  },
  //删除部门
  removeTreeNode: function() {
    var _this = this;
    RightMenu.hideRMenu();
    var nodes = zTreeDoc.getSelectedNodes();
    var win = gloabl.layer.confirm('确定删除部门吗？如果删除将连同子节点一起删掉！', {
      title: '系统提示',
      btn: ['确定', '取消'],
      skin: '',
      yes: function() {
        var params = 'TM00101=' + nodes[0].id;
        fethAsync([URL.DETELE_DEPARTMENT_URL], params, res => {
          if (res.success) {
            zTreeDoc.removeNode(nodes[0]);
            gloabl.layer.close(win);
            tipTools('删除成功');
          } else {
            tipTools('删除失败');
          }
        });
      }
    })
  },
  //修改部门名称之后调用
  onRename: function(event, treeId, treeNode, isCancel) {
    if (stringUtil.isSafe(treeNode.name)) {
      gloabl.layer.msg("修改名称失败！不能含有有非法字符");
      var nodes = zTreeDoc.getSelectedNodes();
      var treeObj = $.fn.zTree.getZTreeObj("manage_tree");
      nodes[0].name = this.deptCname;
      treeObj.editName(nodes[0]);
      return false;
    }
    if (stringUtil.valueLength(treeNode.name) > 16) {
      gloabl.layer.msg("修改名称失败！新名称超长");
      var nodes = zTreeDoc.getSelectedNodes();
      var treeObj = $.fn.zTree.getZTreeObj("manage_tree");
      nodes[0].name = this.deptCname;
      gloabl.treeObj.editName(nodes[0]);
      return false;
    }
    if (stringUtil.valueLength(treeNode.name) < 1) {
      gloabl.layer.msg("修改名称失败！新名称不能为空");
      var nodes = zTreeDoc.getSelectedNodes();
      var treeObj = $.fn.zTree.getZTreeObj("manage_tree");
      nodes[0].name = this.deptCname;
      treeObj.editName(nodes[0]);
      return false;
    }
    if (!isCancel) {
      var nodes = zTreeDoc.getSelectedNodes();
      var param = 'TM00101=' + nodes[0].id + '&TM00106=' + treeNode.name;
      gloabl.fethAsync([URL.UPDATE_DEPARTMENT_NAME_URL], param, res => {
        if (res.success) {
          gloabl.tipTools('修改成功');
        } else {
          gloabl.tipTools('修改失败');
        }
      })
    }
  },
  //右键操作
  OnRightClick: function(event, treeId, treeNode) {
    var _this = this;
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
      zTreeDoc.cancelSelectedNode();
      RightMenu.showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
      zTreeDoc.selectNode(treeNode);

      RightMenu.showRMenu("node", event.clientX, event.clientY);
    }
  },
  deptCname: '',
  //修改部门名称
  renameTree: function() {
    var _this = this;
    RightMenu.hideRMenu();
    var nodes = zTreeDoc.getSelectedNodes();
    var id = nodes[0].id;
    //		if (confirm('确定要修改部门名称吗？') == true) {
    var nodesName = nodes[0].name;

    if (nodesName.indexOf("（") >= 0) {
      nodes[0].name = nodesName.substring(0, nodesName.indexOf("（"));
    }
    var treeObj = $.fn.zTree.getZTreeObj("manage_tree");
    this.deptCname = nodes[0].name;
    treeObj.editName(nodes[0]);
    //		}
  }

};
var RightMenu = {
  //显示菜单
  showRMenu: function(type, x, y) {
    var _this = this;
    $("#rMenu ul").show();
    if (type == "root") {
      $("#m_del").hide();
      $('#m_rename').hide();
      $('#m_add').html("添加部门");
    } else {
      $("#m_del").show();
      $('#m_rename').show();
      $('#m_add').html("添加子部门");
    }
    rMenu.css({
      "top": y + "px",
      "left": x + "px",
      "visibility": "visible"
    });
    $("body").bind("mousedown", _this.onBodyMouseDown);
  },
  hideRMenu: function() {
    var _this = this;
    if (rMenu) {
      rMenu.css({
        "visibility": "hidden"
      });
      $("body").unbind("mousedown", _this.onBodyMouseDown);
    }
  },
  //菜单位置显示
  onBodyMouseDown: function(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
      rMenu.css({
        "visibility": "hidden"
      });
    }
  },
  targetNodesLevel: function(treeNodes, level) {
    var _this = this;
    level += 1;
    for (var i = 0; i < treeNodes.children.length; i++) {
      if (treeNodes.children[i] != undefined) {
        var childrenLevel = (_this.targetNodesLevel(treeNodes.children[i], level));
        if (level < childrenLevel) {
          level = childrenLevel;
        }
      }
    }
    return level;
  },
  getRightManageList: function(id, vm_this) {
    var lay = layer.load(2);
    var param = 'TM00101=' + id;
    gloabl.fethAsync([URL.SEARCH_ONE_DPART_URL], param, res => {
      if (res.success) {
        vm_this.$store.dispatch('MANAGE_LIST', res.result);
        layer.close(lay);
      }
    });
  }
}

export function treeInit(data, v_this) {
  ManageTree.init(data, v_this);

}
