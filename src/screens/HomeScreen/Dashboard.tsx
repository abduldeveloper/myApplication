import React, {useRef, useCallback,useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import Fonts from '../../styles/Fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Color from '../../styles/Color';
import ThemeStyle from '../../styles/ThemeStyle';
import Icon from '../../common/Icons';
import {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import ContentLoader from '../../components/ContentLoader';
import {AC_GetDashboardList, AC_RestAuthState} from '../../actions/Auth/SignIn';
import {clearAllLocalData, infoDialog} from '../../utlities/Helper';
import { useAndroidBackNavigationEffect } from '../../common/UseBackHandler';

interface IDashboard {
  SignInState: any;
  RestAuthState: () => {};
}

const Dashboard: React.FC<IDashboard> = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const scrollPosition = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 100});

  const {height, width} = useWindowDimensions();



  const doLogout = async () => {
    try {
      await clearAllLocalData();

      navigation.navigate('SignInScreen');
    } catch (error) {
      // Handle any errors that might occur during logout
      console.error('Logout error:', error);
    }
  };
  const backAction = () => {
    return true;
  };
  useAndroidBackNavigationEffect(backAction);
 

  

  const renderHeader = () => {
    
    return (
      <View
        style={{
          flex: 0.08,
          paddingLeft: 24,
          backgroundColor: Color.brownDark,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
          }}>
          <Text
            style={{
              color: Color.bgColor,
              fontFamily: Fonts.bold,
              fontSize: 16,
            }}>
            Welcome to  {'\n'}
            <Text style={{color: Color.white}}>SparkSupport</Text>{' '}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginRight: 8,
            paddingHorizontal: 10,
            flex: 0.1,
            justifyContent: 'center',
          }}
          onPress={() => {
            infoDialog(
              "Confirm",
              "Are you sure you want to logout",
              doLogout
            );
          }}>
          <Icon
            family="MaterialCommunityIcons"
            name={'logout'}
            color={Color.beige}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginRight: 15,
            paddingHorizontal: 10,
            flex: 0.1,
            justifyContent: 'center',
          }}>
          <Icon family="Ionicons" name={'menu'} color={Color.beige} size={28} />
        </TouchableOpacity>
      </View>
    );
  };

  const ListofImage = ({item, index}) => {
    const textTranslate = useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollPosition.value,
        [
          ((index - 1) * height) / 2,
          (index * height) / 2,
          ((index + 1) * height) / 2,
        ],
        [-100, 0, 100],
      );
      return {
        transform: [{translateY}],
      };
    }, []);
    return (
      <>
        <View style={{marginBottom: 20, flex: 1}}>
          <View
            style={[
              styles.scrollContent,
              {
                flex: 1,
                borderRadius: 20,
                margin: 25,
                //   justifyContent: 'center',
                //   alignContent: 'center',

                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.4,
                shadowRadius: 4,
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.6,
                shadowRadius: 10,
                elevation: 11,

                height: 420,
              },
            ]}
            key={index}>
            <Animated.Image
              style={[
                {
                  width: '100%',
                  borderRadius: 20,
                  resizeMode: 'cover',
                  height: '200%',
                },
                textTranslate,
              ]}
              source={{uri: item.image_link}}
              ref={(ref) => (item.imageRef = ref || null)}
            />
          </View>
        </View>
      </>
    );
  };

  const renderEmptyDashboard = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      
        <View>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              color: Color.black,
              fontWeight: 'bold',
            }}>
            No Data Found !!!
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={ThemeStyle.pageContainer}
      edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor={Color.beige} barStyle="dark-content" />

      <View style={{flex: 1}}>
        {/* Header */}
        {renderHeader()}

        {props.SignInState.listLoading ? (
          <>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ContentLoader />
            </View>
          </>
        ) : props?.SignInState?.dasboardList?.length == 0 ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              {renderEmptyDashboard()}
            </View>
          </>
        ) : (
          <Animated.ScrollView
            style={{flex: 1}}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            showsVerticalScrollIndicator={false}>
            <View style={styles.view}>
              <AnimatedFlatList
                onScroll={handleScroll}
                data={props?.SignInState?.dasboardList}
                scrollEventThrottle={16}
                renderItem={({item, index}: any) => {
                  return (
                    <>
                      {item.id != '3' && item.id != '5' && (
                        <TouchableOpacity>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <ListofImage
                              scrollPosition={scrollPosition}
                              item={item}
                              index={index}
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                    </>
                  );
                }}
              />
            </View>
          </Animated.ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: Color.bgColor,
    flex: 1,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  contentRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  profileDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: 'black',
    paddingTop: 20,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  scrollContent: {
    height: Dimensions.get('screen').height / 2.2,
    width: Dimensions.get('screen').width / 1.08,
    alignItems: 'center',
    overflow: 'hidden',
    margin: 16,
    marginBottom: -16,
  },
  ripponImage: {
    width: '25%',
    height: 40,
  },
});

const mapStateToProps = (state: any) => ({
  SignInState: state.SignInState,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    RestAuthState: () => dispatch(AC_RestAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
