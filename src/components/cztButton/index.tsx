import React from "react";
import { View, Button } from "@tarojs/components";
import { ButtonProps } from "@tarojs/components/types/Button";
import { BaseEventOrig } from "@tarojs/components/types/common";
import classNames from "classnames";
import "../../styles/components/cztButton/index.scss";

interface Props {
  formType?: "submit" | "reset";
  focusAnimation?: boolean;
  children?: React.ReactNode;
  onClick?: Function;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  plain?: boolean;
  onGetPhoneNumber?: Function;
  onOpenSetting?: Function;
  onGetUserInfo?: Function;
  onContact?: Function;
  onGetAuthorize?: Function;
  onGetRealnameAuthInfo?: Function;
  onLaunchapp?: Function;
  size?: "default" | "mini";
  scope?: "userInfo" | "phoneNumber";
  openType?:
    | "contact"
    | "share"
    | "getUserInfo"
    | "getPhoneNumber"
    | "launchApp"
    | "openSetting"
    | "feedback"
    | "getRealnameAuthInfo"
    | "getAuthorize"
    | "contactShare"
    | "";
  // size?:'normal' | 'mini' | 'default';
}
CztButton.defaultProps = {
  size: "default",
  circle: false,
  full: false,
  plain: false,
  loading: false,
  disabled: false,
  customStyle: {},
  // Button props
  scope: "userInfo",
  lang: "en",
  sessionFrom: "",
  sendMessageTitle: "",
  sendMessagePath: "",
  sendMessageImg: "",
  showMessageCard: false,
  appParameter: "",
  focusAnimation: true,
};
export default function CztButton(props: Props) {
  const onClick = (event: any) => {
    if (!props.disabled) {
      props.onClick && props.onClick(event);
    }
  };
  const onGetPhoneNumber = (
    event: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>
  ) => {
    if (!props.disabled) {
      props.onGetPhoneNumber && props.onGetPhoneNumber(event);
    }
  };
  const onGetUserInfo = (event: any) => {
    if (!props.disabled) {
      props.onGetUserInfo && props.onGetUserInfo(event);
    }
  };
  const onOpenSetting = (event: any) => {
    if (!props.disabled) {
      props.onOpenSetting && props.onOpenSetting(event);
    }
  };
  const onContact = (
    event: BaseEventOrig<ButtonProps.onContactEventDetail>
  ) => {
    props.onContact && props.onContact(event);
  };
  const onGetAuthorize = (event: any) => {
    props.onGetAuthorize && props.onGetAuthorize(event);
  };
  const onGetRealnameAuthInfo = (event: any) => {
    props.onGetRealnameAuthInfo && props.onGetRealnameAuthInfo(event);
  };
  const onLaunchapp = (event: any) => {
    props.onLaunchapp && props.onLaunchapp(event);
  };
  return (
    <View onClick={onClick}>
      <Button
        formType={props.formType}
        loading={props.loading}
        plain={props.plain}
        size={props.size}
        disabled={props.disabled}
        className={classNames(
          props.disabled
            ? "czt-button-disabled czt-button-disabled-bg"
            : "czt-button",
          props.focusAnimation ? "czt-button-line" : "",
          props.className
        )}
        openType={props.openType}
        scope={props.scope}
        onLaunchapp={onLaunchapp}
        onContact={onContact}
        onGetRealnameAuthInfo={onGetRealnameAuthInfo}
        onGetAuthorize={onGetAuthorize}
        onGetUserInfo={onGetUserInfo}
        onOpenSetting={onOpenSetting}
        onGetPhoneNumber={onGetPhoneNumber}
      >
        {props.children}
      </Button>
    </View>
  );
}
