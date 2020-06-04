import { message, Modal } from 'antd';
import common from './common';

module.exports = {
    verifyConditionTree(conditionVO) {
        console.log(conditionVO.conditions);
        for (let i = 0; i < conditionVO.conditions.length; i++) {
            var element = conditionVO.conditions[i];
            if (element.nodeType == 1) {
                if ((!element.expressionVO.varCode && element.expressionVO.varCode !== 0) || (!element.expressionVO.varCode && element.expressionVO.varCode !== 0)) {
                    console.log("请选择完全您的条件变量");
                    message.warning("请选择完全您的条件变量");
                    return false
                }
                if (!element.expressionVO.optType && element.expressionVO.optType !== 0) {
                    console.log("请选择完全您的变量关系类型");
                    message.warning("请选择完全您的变量关系类型");
                    return false
                }
                if (element.expressionVO.varDataType != 12 && element.expressionVO.optType != 8 && element.expressionVO.optType != 9) {
                    if ((!element.expressionVO.value && element.expressionVO.value !== 0) || (!element.expressionVO.valueCode && element.expressionVO.valueCode !== 0) || (!element.expressionVO.valueType && element.expressionVO.valueType !== 0)) {
                        console.log("请补充完整变量比较值");
                        message.warning("请补充完整变量比较值");
                        return false
                    }
                    element.expressionVO.valueType = Number(element.expressionVO.valueType);
                } else if (element.expressionVO.valueType == 'var') {
                    console.log("请补充完整变量比较值" + i);
                    return false
                }
                element.expressionVO.varType = Number(element.expressionVO.varType);

            } else {
                for (let j = 0; j < element.conditions.length; j++) {
                    let element2 = element.conditions[j];
                    if (element2.nodeType === 1) {
                        if ((!element2.expressionVO.varCode && element2.expressionVO.varCode !== 0) || (!element2.expressionVO.varCode && element2.expressionVO.varCode !== 0)) {
                            console.log("请选择完全您的条件变量");
                            message.warning("请选择完全您的条件变量");
                            return false
                        }
                        if (!element2.expressionVO.optType && element2.expressionVO.optType !== 0) {
                            console.log("请选择完全您的变量关系类型");
                            message.warning("请选择完全您的变量关系类型");
                            return false
                        }
                        if (element2.expressionVO.varDataType != 12 && element2.expressionVO.optType != 8 && element2.expressionVO.optType != 9) {
                            if ((!element2.expressionVO.value && element2.expressionVO.value !== 0) || (!element2.expressionVO.valueCode && element2.expressionVO.valueCode !== 0) || (!element2.expressionVO.valueType && element2.expressionVO.valueType !== 0)) {
                                console.log("请补充完整变量比较值");
                                message.warning("请补充完整变量比较值");
                                return false
                            }
                            element2.expressionVO.valueType = Number(element2.expressionVO.valueType);
                        } else if (element2.expressionVO.valueType == 'var') {
                            console.log("请补充完整变量比较值" + i);
                            return false
                        }

                        element2.expressionVO.varType = Number(element2.expressionVO.varType);

                    } else {
                        for (let k = 0; k < element2.conditions.length; k++) {
                            let element3 = element2.conditions[k];
                            if (element3.nodeType === 1) {
                                if ((!element3.expressionVO.varCode && element3.expressionVO.varCode !== 0) || (!element3.expressionVO.varCode && element3.expressionVO.varCode !== 0)) {
                                    console.log("请选择完全您的条件变量");
                                    message.warning("请选择完全您的条件变量");
                                    return false
                                }
                                if (!element3.expressionVO.optType && element3.expressionVO.optType !== 0) {
                                    console.log("请选择完全您的变量关系类型");
                                    message.warning("请选择完全您的变量关系类型");
                                    return false
                                }
                                if (element3.expressionVO.varDataType != 12 && element3.expressionVO.optType != 8 && element3.expressionVO.optType != 9) {
                                    if ((!element3.expressionVO.value && element3.expressionVO.value !== 0) || (!element3.expressionVO.valueCode && element3.expressionVO.valueCode !== 0) || (!element3.expressionVO.valueType && element3.expressionVO.valueType !== 0)) {
                                        console.log("请补充完整变量比较值");
                                        message.warning("请补充完整变量比较值");
                                        return false
                                    }
                                    element3.expressionVO.valueType = Number(element3.expressionVO.valueType);
                                } else if (element3.expressionVO.valueType == 'var') {
                                    console.log("请补充完整变量比较值" + i);
                                    return false
                                }

                                element3.expressionVO.varType = Number(element3.expressionVO.varType);

                            }
                        }
                    }
                }
            }
        }
        return true
    },
    /**
     * resultFul的返回码判断
     * @param {*} res
     * @returns boolean
     */
    isOk(res) {
        if (common.isEmpty(res.data)) {
            Modal.warning({
                title: '系统提示',
                content: "未能获取数据",
            });
            return false
        } else {
            if (res.data.resultCode !== 1000) {
                Modal.warning({
                    title: '系统提示',
                    content: res.data.resultMessage,
                });
                return false
            } else {
                return true
            }
        }

    }
}