import React from 'react';
import { Form, Select, Input, Icon,Button, DatePicker } from 'antd';
import Utils from '../../utils'
const FormItem=Form.Item;
const Option=Select.Option;
class BaseForm extends React.Component{
    constructor(proos){
        super(proos);
        this.state={

        }
    }
    // 提交
    handleSubmit=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    // 刷新
    refresh=()=>{
        Utils.refresh()
    }
    // 生成form 结构方法
    RenderFormList(){ 
        var formIListHtml = []; 
        const formList = this.props.formList;
        formList.forEach((item, i) => { 
            const { getFieldDecorator } = this.props.form; 
            if (item.type =='INPUT') {
                const INPUT= <FormItem label={item.label} key={item.field}>
                        {
                            getFieldDecorator([item.field], { 
                            })(
                            <Input initialValue={item.initialValue} key={item.field} placeholder={item.placeholder}  /> 
                            )
                        }
                    </FormItem>
                formIListHtml.push(INPUT)

            }else if(item.type =='SELECT') {
                const SELECT= <FormItem   label={item.label} >
                    {
                        getFieldDecorator([item.field], { 
                        })(
                            <Select
                            initialValue={item.initialValue}
                            style={{ width: item.width }}
                            placeholder={item.placeholder} 
                            >
                                    {Utils.getOptionList(item.list)}
                            </Select>
                        )
                        }
                    </FormItem >
                formIListHtml.push(SELECT)
            }else if (item.type =='PERIOD'){ //时间段  开始-结束时间
                const startTime = <FormItem style={{ width: item.width }} key={item.datePickerStart}>
                        {getFieldDecorator('datePickerStart', )(
                            <DatePicker placeholder="开始时间" />
                        )}
                    </FormItem>
                const endTime = <FormItem style={{ width: item.width }} key={item.datePickerEnd}>
                        {getFieldDecorator('datePickerEnd', )(
                            <DatePicker placeholder="结束时间" />
                        )}
                    </FormItem>
                formIListHtml.push(startTime)
                formIListHtml.push(endTime)
            }
            
           
        })
        return formIListHtml;
    }
    render(){ 
        return(
            <Form layout="inline" onSubmit={this.handleSubmit} className="search-box">
                {this.RenderFormList()}
                <FormItem>
                    <Button type="primary" htmlType="submit" >查询</Button> 
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.refresh} >刷新</Button>
                </FormItem>
            </Form>
        )
    }
}

export default BaseForm=Form.create()(BaseForm)
