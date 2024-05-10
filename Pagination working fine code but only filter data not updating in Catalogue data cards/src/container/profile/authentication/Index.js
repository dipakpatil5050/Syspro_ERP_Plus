import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { AuthenticationWrap } from './overview/style';

const AuthLayout = (WraperContent) => {
  return function () {
    return (
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <AuthenticationWrap style={{ backgroundImage: `url("${require('../../../static/img/admin-bg-light.png')}")` }}>
          <div className="ninjadash-authentication-wrap">
            <div className="ninjadash-authentication-brand">
              {/* galaxy infotech logo */}
              {/* purple Color logo Link : https://i.imgur.com/loUfK6S.png */}
              {/* Original logo Link : https://i.imgur.com/ciq27SF.png */}
              {/* local computer path : src="./mpinCompnayLogo.png" */}
              <img width={230} src="https://i.imgur.com/ciq27SF.png" alt="Company Logo Loading..." />
            </div>
            <WraperContent />
          </div>
        </AuthenticationWrap>
      </Suspense>
    );
  };
};

export default AuthLayout;
