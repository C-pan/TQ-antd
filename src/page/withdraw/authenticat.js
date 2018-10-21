import React from "react";
import { Form, Input, Button, Upload, Icon, message,Row,Col } from "antd";
import './index.less'
var FormItem=Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}


var imageUrl=''
class Authenticat extends React.Component{
    state={
        imageUrl:null
    }
    // 上传图片方法
    handleChange = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
    render(){
        var {getFieldDecorator}=this.props.form;
        return(
            <div className="content-box"> 
                    <Form onSubmit={this.handleSubmit} style={{width:'600px',margin:'0 auto',padding: "50px 80px",}}>
                        <FormItem
                            label="提现人姓名："
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('note', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem
                            label="提现人身份证："
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('note', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem>
                            <Row className="upload-itme">
                                <Col span="7" className="card-label">身份证正面：</Col>
                                <Col span="17" >
                                        <Upload
                                            className="avatar-uploader"
                                            name="avatar"
                                            showUploadList={false}
                                            action="//jsonplaceholder.typicode.com/posts/"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange}
                                        >
                                            {
                                                imageUrl ?
                                                    <img src={imageUrl} alt="" className="avatar" /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                    </Col>
                                
                            </Row>
                            <Row className="upload-itme">
                                <Col span="7" className="card-label">身份证正面：</Col>
                                <Col span="17"  >
                                    <Upload
                                        className="avatar-uploader"
                                        name="avatar"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {
                                            imageUrl ?
                                                <img src={imageUrl} alt="" className="avatar" /> :
                                                <Icon type="plus" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>
                                </Col>
                                <Col className="red">**需本人有效身份证数码照片，或者扫描文件，内容保证真实有效，不得涂改编辑，身份证上信息需清晰可见。文件不超过300K.
</Col>
                            </Row>
                            <Row className="upload-itme">
                                <Col span="7" className="card-label">身份证正面：</Col>
                                <Col span="17" >
                                    <Upload
                                        className="avatar-uploader"
                                        name="avatar"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {
                                            imageUrl ?
                                                <img src={imageUrl} alt="" className="avatar" /> :
                                                <Icon type="plus" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>
                                </Col>
                                <Col className="red">**需本人有效身份证数码照片，或者扫描文件，内容保证真实有效，不得涂改编辑，身份证上信息需清晰可见。文件不超过300K.</Col>
                            </Row>
                            
                        </FormItem>
                    <FormItem style={{ textAlign: 'center'}}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </FormItem>
                    </Form>
                
            </div>
        )
    }
} 



 
export default Authenticat = Form.create()(Authenticat);