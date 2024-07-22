import styled from 'styled-components';
import { Spin } from 'antd';

export const CenteredSpin = styled(Spin)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 50;
`;
