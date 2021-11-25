/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView } from "@tarojs/components";
import classNames from "classnames";

import "../../styles/components/cztButton/index.scss";

interface Props {
  isScrollView?: boolean;
  tabTitleList: Array<any> | [];
  current?: number;
  swiperTab?: Function;
  children?: Object;
  clickTab?: Function;
  noSliding?: boolean;
  className?: string;
  swiperStyle?: string;
  swiperTabStyle?: string;
  scrollStyle?: string;
  tabTextActiveClassName?: string;
  refresherEnabled?: boolean;
  onScrollViewRefresherRefresh?: Function;
  onScrollToLower?: Function;
  refresherBackground?: string;
}
CztTab.defaultProps = {
  tabTitleList: [],
  current: 0,
  isScrollView: true,
  noSliding: false,
  refresherEnabled: false,
  refresherBackground: "#F5F5F5",
};
export default function CztTab(props: Props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [scrollType, setScrollType] = useState(false);

  const [scrollTop, setScrollTop] = useState(80);
  const [scrollLineTop, setScrollLineTop] = useState(0);

  useEffect(() => {
    setScrollTop(80);
  }, [props.current, currentTab]);

  const clickTab = (event: any, index) => {
    if (myIsNaN(props.current)) {
      props.clickTab && props.clickTab(event, index);
    } else {
      if (currentTab == index) {
        return false;
      } else {
        setCurrentTab(index);
      }
    }
  };
  const myIsNaN = (value) => {
    return typeof value === "number" && !isNaN(value);
  };
  const scrollRef = useRef(() => {});

  useEffect(() => {
    scrollRef.current = effectScroll;
  });
  useEffect(() => {
    scrollRef.current();
  }, [scrollLineTop]);
  const effectScroll = () => {
    if (scrollType) {
      if (scrollLineTop < sumScrollTop() && scrollTop == 80) {
        setScrollTop(sumScrollTop() + 0.00001);
        setScrollType(false);
      } else if (
        scrollLineTop < sumScrollTop() &&
        scrollTop < sumScrollTop() + 0.00002 &&
        scrollTop == 80.00001
      ) {
        setScrollTop(sumScrollTop());
        setScrollType(false);
      }
    }
  };
  // const touchEnd = async (e) => {
  //   //  if(e.detail.scrollTop<=sumScrollTop()){
  //   //   setScrollTop(scrollTop+0.00001)
  //   //  }else if(sumScrollTop()<e.detail.scrollTop&&e.detail.scrollTop<sumScrollTop()+0.00002){
  //   //   setScrollTop(sumScrollTop())
  //   //  }
  //   if (e.detail.scrollTop < 30) {
  //     props.onScrollViewRefresherRefresh &&
  //       (await props.onScrollViewRefresherRefresh(e));
  //   }
  // };

  // const touchStart = () => {
  //   setScrollType(true);
  //   //  if(event.detail.scrollTop<=sumScrollTop()){

  //   //   setScrollType(true)

  //   //  }else if(sumScrollTop()<event.detail.scrollTop&&event.detail.scrollTop<sumScrollTop()+0.00002){
  //   //   setScrollType(true)

  //   //  }else{
  //   //   setScrollType(false)
  //   //  }
  // };
  const sumScrollTop = () => {
    return 80;
  };
  const onScrolly = async (event) => {
    setScrollLineTop(event.detail.scrollTop);
    //  if(scrollType){

    //  }else{

    //   if(event.detail.scrollTop<=sumScrollTop()){

    //     setScrollType(true)

    //     setScrollTop(scrollTop+0.00001)

    //    }else if(sumScrollTop()<event.detail.scrollTop&&event.detail.scrollTop<sumScrollTop()+0.00002){
    //     setScrollType(true)

    //     setScrollTop(sumScrollTop())
    //    }else{
    //     setScrollType(false)
    //    }
    //  }
  };

  const onScrollToLower = (event) => {
    props.onScrollToLower && props.onScrollToLower(event);
  };

  const isScrollView = (type = true) => {
    if (type) {
      return (
        <ScrollView
          scrollWithAnimation
          style={{
            //...dargStyle,
            position: "relative",
          }}
          scrollY
          lowerThreshold={2}
          onScrollToLower={onScrollToLower}
          onScroll={onScrolly}
          className={props.scrollStyle}
          scrollTop={scrollTop}
        >
          <View style={{ marginTop: 80 }}></View>
          <View>
            {
              props.tabTitleList[
                myIsNaN(props.current) ? props.current! : currentTab
              ].comment
            }
          </View>
          {/*props.children*/}
          {/* <Swiper className={props.noSliding?`swiper-container ${props.swiperStyle}`:props.swiperStyle} current={myIsNaN(props.current)?props.current:currentTab}  onChange={(event)=>swiperTab(event)}>
          {props.children}
        </Swiper> */}
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{
            //...dargStyle,
            position: "relative",
          }}
          className={props.scrollStyle}
        >
          <View className="scrollChildren">
            {
              props.tabTitleList[
                myIsNaN(props.current) ? props.current! : currentTab
              ].comment
            }
          </View>
          {/*props.children*/}
          {/* <Swiper className={props.noSliding?`swiper-container ${props.swiperStyle}`:props.swiperStyle} current={myIsNaN(props.current)?props.current:currentTab}  onChange={(event)=>swiperTab(event)}>
          {props.children}
        </Swiper> */}
        </View>
      );
    }
  };
  return (
    <View className={classNames("cztTab", props.className)}>
      <View className={classNames("swiper-tab", props.swiperTabStyle)}>
        {(props.tabTitleList as any).map((item, index) => {
          return (
            <View
              className="swiper-tab-item"
              style={`width:calc(100% / ${props.tabTitleList.length})`}
              key={index}
              onClick={(event) => clickTab(event, index)}
            >
              <View
                className={`active-tit ${
                  (myIsNaN(props.current) ? props.current : currentTab) == index
                    ? classNames("active", props.tabTextActiveClassName)
                    : ""
                }`}
              >
                <View className="tab-titel">
                  {item.title}
                  {item.text + "" && (
                    <View className={item.textClassName}>{item.text}</View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
      {isScrollView(props.isScrollView)}
    </View>
  );
}
