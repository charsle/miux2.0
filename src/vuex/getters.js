// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

export function currentThread(state) {
	console.log(state.currentRight)
	return state.currentRight
}

export function chanageNameThread(state) {
	
	return state.threads
}
//
export function getDepartList(state) {
	
	return state.departmentList
}
export function getChoosePersonList(state) {
	return state.chooseSuerPerson;
}
export function getNowsMessage(state) {
	return state.messages;
}
//export function getManageList(state) {
//	return state.manageList;
//}