import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../../axios';
import Utils from '../../utils';
import { Breadcrumb,Form, Icon, Input, Table, Button,Select, Modal,Radio,Tree,Transfer,Message   } from 'antd';
import '../../style/common.css'
import menuConfig from '../../config/menuConfig';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;


const columns = [
    {
        title: '角色ID',
        dataIndex: 'id'
    }, {
        title: '角色名称',
        dataIndex: 'role_name'
    },{
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formatTime
    }, {
        title: '使用状态',
        dataIndex: 'status',
        render(status){
            if (status == 1) {
                return "启用"
            } else {
                return "停用"
            }
        }
    }, {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formatTime
    }, {
        title: '授权人',
        dataIndex: 'authorize_user_name',
    }
];





// 用户授权数据
const TransferData=[
    {
        name:"chen",
        title:"张三",
        key:"cs1"
    },
    {
        name:"chen2",
        title:"李四",
        key:"cs2"
    },
    {
        name:"chen3",
        title:"王五",
        key:"cs3"
    },
    {
        name:"chen",
        title:"张三",
        key:"cs1"
    },
    {
        name:"chen2",
        title:"李四",
        key:"cs2"
    },
    {
        name:"chen3",
        title:"王五",
        key:"cs3"
    },
    {
        name:"chen",
        title:"张三",
        key:"cs1"
    },
    {
        name:"chen2",
        title:"李四",
        key:"cs2"
    },
    {
        name:"chen3",
        title:"王五",
        key:"cs3"
    },
    {
        name:"chen",
        title:"张三",
        key:"cs1"
    },
    {
        name:"chen2",
        title:"李四",
        key:"cs2"
    },
    {
        name:"chen3",
        title:"王五",
        key:"cs3"
    },
    
]
 
// 权限设置模块页面
export default class Permission2 extends React.Component { 
    state ={  
        visibelRole:false,
        visibelSetPermission:false,
        visibelUserAuth:false,
        autoExpandParent:true,//自动展开tree列表
        roleId:'',//选择修改的那项角色id
        selecUser:''
    }; 
    componentWillMount = () => {
        this.requestData()
    };
    requestData(page){
        var that=this;
        var loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';
        
        axios.ajax({
            url: '/role/list',
            mock:1,
            data: {
                params: {
                    uid: '2',
                    page: page||'1'
                }
            }
        }).then((res) => {
            console.log(res)
            that.setState({
                dataSource: res.result.item_list
            })
        })
    }
    
    // 分页
    selecPage=(pages,s,f)=>{
        this.requestData(pages)
    }
    // 创建角色按钮
    createRole=()=>{
        this.setState({
            visibelRole:true
        })
    }
    // 保存 创建角色
    handleCreateRole=(e)=>{
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            } 
            console.log('Received values of form: ', values);
            this.requestData()
            form.resetFields();
            this.setState({
                visibelRole: false,
            });
        });
        
    }
    // 取消创建角色按钮
    handleCancelRole=(e)=>{
        console.log(e);
        this.setState({
            visibelRole: false,
        });
    }   
    // 设置权限按钮
    showSetPermission=()=>{
        if(this.state.roleId){
            this.setState({ 
                visibelSetPermission:true
            })
        }else{
            Message.info("请选择一个角色处理")
        }
        
    }
    // 取消设置权限模态框
    handleCancelSetPermission=()=>{ 
        this.setState({
            visibelSetPermission: false,
        });
    } 
    // 保存设置权限
    handleSetPermission=()=>{
        this.setState({
            visibelSetPermission: false,
        });
    }





    // 用户授权按钮
    showUserAuth=()=>{
        if(this.state.roleId){
            this.setState({ 
                visibelUserAuth:true
            })
        }else{
            Message.info("请选择一个角色处理")
        }
        
    }
    // 取消用户授权按钮
    handleCancelUserAuth=()=>{
        this.setState({ 
            visibelUserAuth:false
        })
    }
    // 保存用户授权按钮
    handleUserAuth=()=>{
        this.setState({ 
            visibelUserAuth:false
        })
    }
    
    
    saveFormRef = (formRef) => {
    this.formRef = formRef;
    
    }

    


    // Tree 组件
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
          expandedKeys,
          autoExpandParent: true,
        });
      }
    
      onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
      }
    
      onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
      }
    
      renderTreeNodes = (data) => {
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode {...item} />;
        });
      }


    //   用户授权 穿梭框
    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });
    
        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
      }
    
      handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    
        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
      }
    
      handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
      }
    
      handleDisable = (disabled) => {
        this.setState({ disabled });
      };
    render() { 
        
        // 配置表格单选
        const rowSelection = {
            type:'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    roleId:selectedRows[0].id
                })
                console.log("选择的id："+selectedRows[0].id)
            },
            // onSelect: (record, selected, selectedRows) => {
            //     console.log(record, selected, selectedRows);
            // },
            // onSelectAll: (selected, selectedRows, changeRows) => {
            //     console.log(selected, selectedRows, changeRows);
            // },
            
        };


        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className="content-box">
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item>权限设置</Breadcrumb.Item>
                    <Breadcrumb.Item> 权限列表</Breadcrumb.Item>
                </Breadcrumb>
            {/* 表单搜索 */}
                <div className="search-box">
                     <Button type="primary" onClick={this.createRole} >创建角色</Button>
                     <Button type="primary" onClick={this.showSetPermission} style={{marginLeft:'20px'}}>设置权限</Button>
                     <Button type="primary" onClick={this.showUserAuth} style={{marginLeft:'20px'}}>用户授权</Button>
                </div>
                {/* 表格 */}
                <Table
                    style={{ width: '100%' }}
                    rowSelection={rowSelection}
                    size="middle"
                    columns={columns}
                    dataSource={this.state.dataSource}
                    owSelection={rowSelection}
                    pagination={{ pageSize: 10, total: 200, onChange: this.selecPage}}      
                    // scroll={{ x: 1150, y: 360 }}
                    bordered 
                />  


                {/* 创建角色 模态框 */} 
                <CreateRoleModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visibelRole}
                    onCancel={this.handleCancelRole}
                    onCreate={this.handleCreateRole}
                    />

                {/* 设置权限 模态框 */}  
                <Modal
                    title="设置权限"
                    centered
                    visible={this.state.visibelSetPermission}
                    onCancel={this.handleCancelSetPermission}
                    onOk={this.handleSetPermission}
                    >
                        <Form   onSubmit={this.handleSubmit} className="search-box">
                            <FormItem label="角色名称"
                            {...formItemLayout}
                            > 
                                    
                                    <Input type="text" style={{ width: '200px' }} disabled defaultValue="管理员" />
                                    
                            </FormItem>
                            <FormItem label="状态" 
                            {...formItemLayout}
                            >
                                
                                    <Select
                                        initialValue={'off'} 
                                        style={{ width: '200px' }}
                                        placeholder="状态"
                                    >
                                        <Option value="on">开启</Option>
                                        <Option value="off">关闭</Option> 
                                    </Select>

                            </FormItem >
                            <FormItem>
                                <Tree
                                    checkable
                                    onExpand={this.onExpand}
                                    expandedKeys={this.state.expandedKeys}
                                    autoExpandParent={this.autoExpandParent}
                                    onCheck={this.onCheck} 
                                    onSelect={this.onSelect}
                                    selectedKeys={this.state.selectedKeys}
                                >
                                    {this.renderTreeNodes(menuConfig)}
                                </Tree>
                            </FormItem>
                        </Form>
                </Modal>


                {/* 用户授权 模态框 */}  
                <Modal
                    title="用户授权"
                    centered
                    visible={this.state.visibelUserAuth}
                    onCancel={this.handleCancelUserAuth}
                    onOk={this.handleUserAuth}
                    >
                        <Form   onSubmit={this.handleSubmit} className="search-box">
                            <FormItem label="角色名称"
                            {...formItemLayout}
                            > 
                                <Input type="text" style={{ width: '200px' }} defaultValue="管理员" disabled />
                                    
                            </FormItem> 
                             <FormItem>
                                <Transfer
                                    dataSource={TransferData}
                                    showSearch
                                    filterOption={this.filterOption}
                                    targetKeys={this.state.targetKeys}
                                    onChange={this.handleChange}
                                    render={item => item.title}
                                />
                             </FormItem> 
                        </Form>
                </Modal>
            </div>
        )
    }
}





//  设置权限 模态框
class setPermissionModal extends React.Component { 
    render(){
        // const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = this.props.form;
        // 创建角色label布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return( 
            <div>
                <span>23222222 </span>
                {/* <Form   onSubmit={this.handleSubmit} className="search-box">
                    <FormItem label="角色名称"
                    {...formItemLayout}
                    > 
                        {getFieldDecorator('roleName', {
                            rules: [{ required: true, message: '请输入角色名称!' }],
                        })(
                            <Input type="text" style={{ width: '200px' }} placeholder="请输入角色名称" />
                        )} 
                    </FormItem>
                    <FormItem label="状态" 
                    {...formItemLayout}
                    >
                        {getFieldDecorator('roleState', {
                            
                        })(
                            <Select
                                initialValue={'off'} 
                                style={{ width: '200px' }}
                                placeholder="状态"
                            >
                                <Option value="on">开启</Option>
                                <Option value="off">关闭</Option> 
                            </Select>
                        )}
                    </FormItem >
                </Form> */}
            </div>
        )
    }
}












//  创建角色 模态框
const CreateRoleModal = Form.create()(
    class extends React.Component { 
    render(){
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = this.props.form;
        // 创建角色label布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return( 
            <div>
                <Modal
                    title="创建角色"
                    visible={visible}
                    onOk={onCreate}
                    onCancel={onCancel}
                    >
                        <Form   onSubmit={this.handleSubmit} className="search-box">
                            <FormItem label="角色名称"
                            {...formItemLayout}
                            > 
                                {getFieldDecorator('roleName', {
                                    rules: [{ required: true, message: '请输入角色名称!' }],
                                })(
                                    <Input type="text" style={{ width: '200px' }} placeholder="请输入角色名称" />
                                )} 
                            </FormItem>
                            <FormItem label="状态" 
                            {...formItemLayout}
                            >
                                {getFieldDecorator('roleState', {
                                    
                                })(
                                    <Select
                                        initialValue={'off'} 
                                        style={{ width: '200px' }}
                                        placeholder="状态"
                                    >
                                        <Option value="on">开启</Option>
                                        <Option value="off">关闭</Option> 
                                    </Select>
                                )}
                            </FormItem >
                    </Form>
                </Modal>
            </div>
        )
    }
})