import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { FC, useCallback, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import useSWR from 'swr';
import gravatar from 'gravatar';
import { Button, Input, Label } from '@pages/SignUp/styles';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';
import loadable from "@loadable/component";
import Menu from "@components/Menu";
import {IUser} from '@typings/db';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace :FC = ({children}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const {data, error, mutate} = useSWR<IUser | false>('/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios.post('/api/users/logout', null, {
      withCredentials: true,
    })
    .then(() => {
      mutate(false, false);
    });
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  if(data === undefined) {
    return <div>로딩 중...</div>
  }

  if(data === false) {
    return <Redirect to='/login'/>;
  }

  return (
    <div>
    <Header>
      <RightMenu>
        <span onClick={onClickUserProfile}>
        <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.nickname} />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(data.email, { s: '36px', d: 'retro' })} alt={data.nickname} />
                  <div>
                    <span id="profile-name">{data.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
        </span>
      </RightMenu>
    </Header>

    <WorkspaceWrapper>
      <Workspaces>test</Workspaces>
      <Channels>
        <WorkspaceName>Sleat</WorkspaceName>
        <MenuScroll>
          {/* <Menu>Menu</Menu> */}
          Menu Scroll
        </MenuScroll>
      </Channels>
      <Chats>
        <Switch>
          <Route path='/workspace/channel' component={Channel} />
          <Route path='/workspace/dm' component={DirectMessage} />
        </Switch>
      </Chats>
    </WorkspaceWrapper>
    {children}
    </div>
  );
}

export default Workspace;