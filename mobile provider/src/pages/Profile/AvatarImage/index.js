import React, { useCallback } from 'react';
import { Alert } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, ImageButton, Image } from './styles';

const AvatarImage = ({ avatar, onChangeAvatar }) => {
  const handleSelectImage = useCallback(
    data => {
      if (data.didCancel) {
        return;
      }
      if (data.error) {
        Alert.alert('Erro', 'houve algum erro no upload da imagem');
        return;
      }
      if (!data.uri) {
        Alert.alert('Erro', 'imagem não foi encontrada');
        return;
      }

      onChangeAvatar(data);
    },
    [onChangeAvatar]
  );

  return (
    <Container>
      <Image
        source={{
          // eslint-disable-next-line no-nested-ternary
          uri: avatar
            ? avatar.uri
              ? avatar.uri
              : avatar
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEX///8AAADtHCTsAAD39/fCwsL7+/vi4uLZ2dk5OTnf39/W1tb19fWkpKTc3Nzy8vImJibo6OjJycldXV19fX21tbXGxsaurq5KSko/Pz+VlZWbm5vPz8+KiopXV1d1dXXsABFqamoWFhaFhYXtEBsjIyNRUVEMDAxDQ0MdHR1ycnItLS1jY2MyMjLzfYD2pafvS1D0kZPxYWXvPkT4uLruIyv72dr5wsT0i47wV1v3rrDya2/98PD60dLuNTv85uYpHvlvAAAIF0lEQVR4nO2dZ5uiSBCAdRBMgxkxYQ4TnNk0e7u34fb//6uTbsAGGRWpapp96v02iFhFd1fqMIUCQRAEQRAEQRAEQRAEQRAEQRAEQRBEFpQak76u9zuVZtaSINCwe4OiwPDJrGctEyD6UzGWrv1XNGZlFq8eZ9/PWr60dB7O6eeytLOWMQ2d6iX98q1jsxsadGOr0Tb4B7W+uVgKnz1XMhb1NmxBg3GMCrXx8HjHSr58aSltA+l7jfduao+OL6EsUzoAKoHoo9LZG+2df6MlSTQYrKD9zuvnMg7ehQTBoDA9mau1a+5uTr3bn7DlAsNvFefaL/hGaYEpFSB+CyYIV8rLPLWi7imYyDiWqvkZiw0uaus+4fe2ebGoBrf+rcs2NIqnYhtBKFA8u3hLWsQ76jO4SLDYN4xBnxJv/h60TKA0uYL6bd/2hrDSyX83XRhtK99PJ9zK3P6Aqer2dJi2l3m9HE4iYDrp4xIe8JlQEkHD64XJPaEIC992QAJBU0sWbsdjpzHG2Kxu9vUi7CFTEIHAgckORurGbn0m2iTtY9rq2poekKFn9mqQ/jnwPALYGRdbVZfYhumk/oM66R8EDS+vGQBPaima7K/Ahs9MUX+xBXvzdsrwHQu4rKAOEPxhAJe8ttX0+YBiGVBWGZYKoBdTM/iuA2q4UTLRh9TwQcnIFFJD5njGMM+CA3IcsjZUbvlCGST95bSUHIf3TMOrZkQvoqYtLcA5sXu44AGUFtjg4R0+6ewcPntXLJBlMZaiBUVWQXqAeJKjaBlDB8sIHoDKIdA0oYoPJUVNaaHwDDQQ4ToDNCugqIaZrGH658AzgfGI3BsqF5Uy2DR86mVNppoZPsMBkY1Nr21BBAKHFzJS2hpLWUvqMgXIL1qAWRg83NakGol8FCqX3wcM0mYF3Nsr24R+KWNz+wP4ehzl0nuBfTpjw82MyiuGUq764sZYwdxXxFu5d5NTNDYQ7gYd7jF2twTO3E69gIsEjLeEcvP3rqD11g0VW0lng6ephrBUvJXsu2Qr2b09UGrmFFH83RMJmqPh7Q1Se33wEX/DxdVW0f/CDFMqUHyJr9tX2N4mfSMK4O8qKc4uF3aDHXrqxttxNIJNd85ZHQ2/uRNtIlKC0jQQffZuXy07wU1V9f3gCcIu2c04Zhtp2RT2QSu4BOoKmsdmLBaX01Gn5gU6Rnky3m+ED4d52yIbMHkpRtktTy618hDHvIt+cUf+S671c6n0zun3pNzCoJvov3M0xkKHWKypCA1zEeqvg5797i79HFMq1yedzmRSU3FiiSCIv4DyxDJHzqo3e+qtnJFpdWCWTylBzXK6p6Gay3Zl1/NuVuvjaaxuAg8jBTePXMe9tbiknc/UzF92WLK2lxUTGeZLyXpcINraLg5GxnHNzaJ7mlYVi93c1DGsiPiH5Fc/PSrRaPTH+1b4zp2Zh1DcDNnNF0c/2/ua/XHoPMWio7pxtUVp99ZVqxYMfZYbHa3dUdAHO8kaWF08vU7ZyYuKcMKck7i21DSPg3KpZmXjWK14vnGdfec4JKfqnfvZD4SrpjD6jWMIpFqNPziDdZNyn0Q9OA50oFIzVh4B37wemCt1RmMwuzKDMfTBbJQqE6Z73wKC1T7bvlWuqtBTm48YLzzoFtkvH6r5ogCHzTXfO2Y9GDu+4YMPtXzznK3b8GezUWbgbQVU9BVE2itY9x6fXZzqK4g2f9ReZtuKE09BxAnce2+mOJs1tf5hyKj1FaOKOg7O0pahYME/ETMDv+itsgTa23yOKvpYiGcgpwUPGNz3y95UyjeqAe3dvoC3eLwr47cCdKkRVU2+W2xK/knvhUqc+R/I7jZ8/dujtN8zUX/P+BVzkb9TWSts26h95lXTXk9r+/fI8WGYAeYgfNPu7uZf/zm5rkvspzypATlbIIZP87sD2oeTD3jlX8Y2fQPX1X/T7piKryefSAsxVsiO4run4r/RD3g/xT+Ljx88gnki3rf12lVx/jFqb/jkDfqs/x7fpv36yMbi/EvkOrfhVcyfLvgB1B75V1413oqRy46MULErZ7h/4ipGxiI3crhbTPkolPC/Uj5ocRaVn2eOuqChJ8tie62o/Qhd5I2IeeACj53k/EcfT8VwdMPnbBD/S9tYXtpbKPx0Ler6a+haEzsAZ5Mw0k5w+uj6xXl4KPLYDW3VTUdmYn/wizxE/S1e494KrXy6cJ8usSLEYtRIP2WT4GgnELH3J3MPFhuK4TzDwrTmujRX4WPwCFVM+rnDQJrIWKB2kFh+uP10/km8tEcMTpHTplj+Y/ZUtJ28J6GU2ifSO+mB36wRxZHIuynKTI0jr1AiwJxiyJxu0eIqqDP1ksE8hvZNuMJrmQg/VcKP62Nxren6s3CBO32EqSg+DOWfm/qB+UTRYWCFNSMZJYQYfmnRLKqLFH2z52ax0OzzOtJNWYaDcFAP3DnBCXljjShc6OPkF9zQZLHKjHdTIcNo45iaekaG5sCXdSRy26EkcTqWF7rM94M1XYtltyFK8M2GN9Z0zHnYQLwTLixQjF4PuUByhj9axCMyxwVelWbOIpsjqFmWKJoaG8U1V7NyFgWeQmlvx79xbMJSahEqzOeIMZ2gaJhR3M14nYerig08DTM6iMSd+V7/PP7dRknzs9TQTS/EyLSJUm3IUsMfrobiZCITBnq1S2ZhaYG7/LU4I4wizANKPH8drsvXvmML0xwWd5ntX3mbaz/Fvw/CwG1BIgiCIAiCIAiCIAiCIAiCIAiCIAiC8z+JPWHGJBZXcwAAAABJRU5ErkJggg==',
        }}
      />
      <ImageButton
        onPress={() => ImagePicker.showImagePicker({}, handleSelectImage)}
      >
        <Icon name="camera-alt" size={26} color="#ff9000" />
      </ImageButton>
    </Container>
  );
};

export default AvatarImage;
