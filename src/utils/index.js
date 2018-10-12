import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;

export default {
    refresh() {
        window.location.reload()
    },
    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },

}