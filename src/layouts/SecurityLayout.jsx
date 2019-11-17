import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import PageLoading from '@/components/PageLoading';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch ,loginName,loginCurrentAuthority} = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
        username:loginName,
        authority:loginCurrentAuthority
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading,currentStatus } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    let token = localStorage.getItem("pro_token");
    //console.log(token);
    // const isLogin = loginName!==undefined;
    // const queryString = stringify({
    //   redirect: window.location.href,
    // });
    //console.log(currentStatus);
    // if (loading ) {
    //   return <PageLoading />;
    // }
    //console.log(token,currentStatus);
    if (token==null) {
      return <Redirect to={`/user/login`}/>;
      // return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    }
    return children;
  }
}

export default connect(({ user, loading,login }) => ({
  currentUser: user.currentUser,
  currentStatus:user.status,
  loading: loading.models.user,
  loginName:login.username
}))(SecurityLayout);
