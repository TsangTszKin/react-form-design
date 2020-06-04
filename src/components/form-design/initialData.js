/*
 * @Author: your name
 * @Date: 2020-06-01 11:43:08
 * @LastEditTime: 2020-06-04 11:08:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-form-design\src\container\todoData.js
 */
const initialData = {
    seeds: [
        {
            id: 'seeds',
            title: '基础字段',
            items: [
                {
                    id: 'seed-1', label: '单行文本', type: 'input', icon: 'icon-danhangwenben', options: {
                        width: '100%',
                        defaultValue: '',
                        required: false,
                        disabled: false,
                        dataType: 'text',
                        placeholder: '请输入'
                    },
                    code:''
                },
                {
                    id: 'seed-2', label: '多行文本', type: 'textarea', icon: 'icon-danhangwenben', options: {
                        width: '100%',
                        defaultValue: '',
                        required: false,
                        disabled: false,
                        placeholder: '请输入'
                    },
                    code:''
                },
                {
                    id: 'seed-3', label: '单选框组', type: 'radio', icon: 'icon-danxuankuang', options: {
                        defaultValue: '',
                        required: false,
                        disabled: false,
                        options: [
                            { label: '标题1', value: '值1' },
                            { label: '标题2', value: '值2' },
                            { label: '标题3', value: '值3' }
                        ]
                    },
                    code:''
                },
                {
                    id: 'seed-4', label: '多选框组', type: 'checkbox', icon: 'icon-duoxuankuang1', options: {
                        defaultValue: '',
                        required: false,
                        disabled: false,
                        options: [
                            { label: '标题1', value: '值1' },
                            { label: '标题2', value: '值2' },
                            { label: '标题3', value: '值3' }
                        ]
                    },
                    code:''
                },
                {
                    id: 'seed-5', label: '下拉选择框', type: 'select', icon: 'icon-xialaxuanze', options: {
                        width: '100%',
                        defaultValue: '',
                        required: false,
                        disabled: false,
                        options: [
                            { label: '标题1', value: '值1' },
                            { label: '标题2', value: '值2' },
                            { label: '标题3', value: '值3' }
                        ]
                    },
                    code:''
                },
                {
                    id: 'seed-6', label: '日期选择器', type: 'date', icon: 'icon-shijianxuanzeqi', options: {
                        width: '100%',
                        format: 'YYYY-MM-DD',
                        required: false,
                        disabled: false,
                        options: [
                            { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
                            { label: 'YYYY-MM-DD HH:mm', value: 'YYYY-MM-DD HH:mm' }
                        ]
                    },
                    code:''
                },
                {
                    id: 'seed-7', label: '开关', type: 'switch', icon: 'icon-kaiguan', options: {
                        defaultValue: '',
                        required: false,
                        disabled: false
                    },
                    code:''
                }
            ]
        }
    ],
    config: {
        layout: 'vertical',
        labelAlign: 'left',
        size: 'default',
    },
    activeId: '',
    content: [
    ]
}

export default initialData