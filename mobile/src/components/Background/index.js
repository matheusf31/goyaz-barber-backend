import styled from 'styled-components/native';

import background from '~/assets/images/background2.jpg';

export default styled.ImageBackground.attrs({
  source: background,
  blurRadius: 2,
})`
  height: 100%;
`;
