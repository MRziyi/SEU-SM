import React from "react";
import Card from "antd/lib/card/Card";
import { PageContainer } from '@ant-design/pro-components';
class Index extends React.Component {
    render() {
        return <div>
            <PageContainer>
                <Card>
                    <h1>
                        订单页
                    </h1>
                </Card>
            </PageContainer>
        </div>
    }
}

export default Index;
