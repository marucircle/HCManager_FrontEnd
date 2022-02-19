import {useEffect} from 'react';
import {PageTitle} from '../../components/Utilities/Title';
import styled from 'styled-components';

import {useUser} from '../../hooks/useUser';
import {Button} from '@material-ui/core';

const RegisterForm = styled.div`
  margin-top: 100px;
  width: 60vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const InputUnit = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 30px;
  padding-bottom: 60px;
  font-size: 20px;
`;

const CreateGroupButton = styled(Button)`
  margin-right: 20px !important;
  font-size: 18px !important;
  border: solid 2px #777;
  background-color: #ddd;
  padding: 5px 20px !important;
  box-shadow: 5px 5px 5px #00000040;
  cursor: pointer;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const Register = () => {
  const {selectUser, setSelectUser, initSelectUser, registerUser} = useUser();

  const onRegister = () => {
    if (selectUser.name == '' || selectUser.mail == '' || selectUser.role == '' || selectUser.password == '') {
      alert('全ての項目を入力してください。');
      return;
    }
    if (confirm('データを作成してよろしいですか？')) {
      registerUser(selectUser);
    }
  };

  useEffect(() => {
    initSelectUser();
  }, []);
  return (
    <div>
      <PageTitle color='blue'>新規登録</PageTitle>
      <RegisterForm>
        <InputUnit>
          <label htmlFor='username'>ユーザー名</label>
          <input
            type='text'
            id='username'
            value={selectUser.name}
            onChange={(e) => setSelectUser({...selectUser, name: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='username'>権限</label>
          <select
            id='username'
            value={selectUser.role}
            onChange={(e) => setSelectUser({...selectUser, role: e.target.value})}
          >
            <option value=''></option>
            <option value='教授者'>教授者</option>
            <option value='学習者'>学習者</option>
            <option value='学習終了者'>学習終了者</option>
            <option value='問題作成者'>問題作成者</option>
          </select>
        </InputUnit>
        <InputUnit>
          <label htmlFor='mailaddress'>メールアドレス</label>
          <input
            type='text'
            id='mailaddress'
            value={selectUser.mail}
            onChange={(e) => setSelectUser({...selectUser, mail: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='password'>パスワード</label>
          <input
            type='password'
            id='password'
            value={selectUser.password}
            onChange={(e) => setSelectUser({...selectUser, password: e.target.value})}
          ></input>
        </InputUnit>
        <CreateGroupButton
          variant='contained'
          color='primary'
          onClick={() => {
            onRegister();
          }}
        >
          登録
        </CreateGroupButton>
      </RegisterForm>
    </div>
  );
};

export default Register;
