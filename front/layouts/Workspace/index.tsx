import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { FC, useCallback } from "react";
import { Redirect } from "react-router";
import useSWR from 'swr';
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

const Workspace :FC = ({children}) => {
  const {data, error, mutate} = useSWR('/api/users', fetcher);
  const onLogout = useCallback(() => {
    axios.post('/api/users/logout', null, {
      withCredentials: true,
    })
    .then(() => {
      mutate();
    });
  }, []);

  if(!data) {
    return <Redirect to='/login/'/>;
  }

  return (<div>
    <button onClick={onLogout}>로그아웃</button>
    {children}
  </div>);
}

export default Workspace;