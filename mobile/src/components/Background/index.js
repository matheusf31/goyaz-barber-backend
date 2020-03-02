import styled from 'styled-components/native';

import background from '~/assets/images/background.jpg';

export default styled.ImageBackground.attrs(props => ({
  source: background,
  blurRadius: props.blurRadius || 2,
}))`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`;
