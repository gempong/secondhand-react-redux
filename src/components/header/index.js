import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Button, Form, Input, Dropdown, Menu } from 'antd';
import { LogIn, Search, List, Bell, User, Menu as MenuIcon, X } from 'react-feather';

import "./index.css";

export default function Header() {
    const [form] = Form.useForm();
    const [user, setUser] = useState(false);
    const [sidebar, setSidebar] = useState(false);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleClick = ({ key }) => {
        console.log(key)
    }

    const showSidebar = () => {
        setSidebar(true)
    }

    const hideSidebar = () => {
        setSidebar(false)
    }

    const handleLogin = () => {
        setUser(true)
    }

    const handleLogout = () => {
        setUser(false)
    }

    const userMenu = (
        <Menu onClick={handleClick} className="mt-3">
            <Menu.Item key="item-1">Akun Saya</Menu.Item>
            <Menu.Item key="item-2" onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
    );

    const notificationDropdown = (
        <div className="notification p-6 bg-white rounded-2xl">
            <div className="notification-item">
                Test
            </div>
        </div>
    );

    return (
        <div className={`header md:py-[18px] py-9 ${sidebar ? 'overlay' : ''}`}>
            <div className="container">
                <Row gutter={30}>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <Row gutter={24}>
                            <Col className="flex items-center">
                                <span className="text-lg font-bold leading-5 text-[#8b48c2] md:block hidden">
                                    Second <br />Hand.
                                </span>
                                <button className="md:hidden navbar-toggler w-12 h-12 bg-white rounded-2xl border-0 flex justify-center items-center" onClick={showSidebar}>
                                    <MenuIcon size={24} />
                                </button>
                            </Col>
                            <Col flex="auto">
                                <Form
                                    form={form}
                                    name="basic"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off">
                                    <Form.Item name="search" className="mb-0">
                                        <Input className="search-bar" placeholder="Cari di sini ..." suffix={<Search color="#8A8A8A" size={24} />} />
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} className="hidden md:flex justify-end items-center">
                        {!user && (
                            <Button className="py-[14px] px-4 h-12 text-sm flex items-center rounded-xl" onClick={handleLogin} type="primary" icon={<LogIn size={20} className="mr-2" />} size="large">
                                Masuk
                            </Button>
                        )}
                        {user && (
                            <>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <List size={24} color="#7126B5" />
                                    </Col>
                                    <Col span={8}>
                                        <Dropdown overlay={notificationDropdown} trigger={['click']}>
                                            <Bell size={24} color="#7126B5" />
                                        </Dropdown>
                                    </Col>
                                    <Col span={8}>
                                        <Dropdown overlay={userMenu} trigger={['click']}>
                                            <User size={24} color="#7126B5" />
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Col>
                </Row>
            </div>
            <div className={`sidebar-mobile w-[180px] fixed top-0 bottom-0 py-9 px-4 bg-white ${sidebar ? 'show' : ''}`}>
                <div className="sidebar-top flex justify-between items-center">
                    <span className="mobile-brand text-sm font-bold">Second Hand</span>
                    <X onClick={hideSidebar} />
                </div>
                <div className="sidebar-menu mt-5">
                    {!user && (
                        <Button className="py-[14px] px-4 h-12 text-sm flex items-center rounded-xl" onClick={handleLogin} type="primary" icon={<LogIn size={20} className="mr-2" />} size="large">
                            Masuk
                        </Button>
                    )}
                    {user && (
                        <>
                            <Link className="text-sm hover:text-[#7126B5] mb-4 block text-black" to="/">Notifikasi</Link>
                            <Link className="text-sm hover:text-[#7126B5] mb-4 block text-black" to="/">Daftar Jual</Link>
                            <Link className="text-sm hover:text-[#7126B5] mb-4 block text-black" to="/">Akun Saya</Link>
                            <span className="text-sm hover:text-[#7126B5] mb-4 block text-black" onClick={handleLogout}>Logout</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}