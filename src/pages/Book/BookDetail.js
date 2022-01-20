import {useEffect, useState} from 'react';

import {useParams} from 'react-router';

import QuestionInfo from '../../components/pages/Questions/QuestionInfo';

import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {Label} from '../../components/Utilities/Card/Label';
import {DetailCard, DetailCardButtons, DetailCardContent, DetailCardSummary} from '../../components/Cards/DetailCard';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {BooksAPI, UsersAPI, QuestionsAPI} from '../../APILink';
import {EditRelationButtonList} from '../../components/Buttons/Lists/EditRelationButtonList';
import {EditBookModal} from '../../components/Modals/Edit/EditBookModal';

const BookDetail = () => {
  const param = useParams();

  const [Book, setBook] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [questionInBook, setQuestionInBook] = useState(); //Bookに登録されてる問題
  const [Questions, setQuestions] = useState(); //全ての問題
  const [Users, setUsers] = useState(); //Formで使用

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [QuestionPostBody, setQuestionPostBody] = useState({
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({book_id: param['id'], question_id: 1}),
  });

  const [editBookPostData, setEditBookPostData] = useState({
    name: '',
    summary: '',
    access_key: '',
    user_id: '',
  });

  const getQuestionInBook = () => {
    if (typeof Book !== 'undefined') {
      fetch(BooksAPI + '/' + param['id'] + '/questions') //api
        .then((res) => res.json())
        .then((json) => {
          if (Array.isArray(json)) {
            setQuestionInBook(json);
          } else {
            setQuestionInBook([]);
          }
        });
    }
  };

  const registerQuestion = () => {
    fetch(BooksAPI + '/addRecord', {...QuestionPostBody, method: 'POST'}) //api groups/addBook
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        getQuestionInBook();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const removeQuestion = () => {
    fetch(BooksAPI + '/removeRecord', {...QuestionPostBody, method: 'DELETE'}) //api groups/addBook
      .then((response) => response)
      .then((data) => {
        console.log('Success:', data);
        getQuestionInBook();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const QuestionPostChange = (id) => {
    setQuestionPostBody({
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({book_id: param['id'], question_id: id}),
    });
  };

  const getBookDataFetch = () => {
    fetch(BooksAPI + '/' + param['id']) //api
      .then((res) => res.json())
      .then((json) => {
        setBook(json);
        setEditBookPostData({
          name: json.name,
          summary: json.summary,
          access_key: json.access_key,
          user_id: json.user_id,
        });
      });
  };

  useEffect(() => {
    getBookDataFetch();
  }, []);

  useEffect(() => {
    fetch(UsersAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
      });
  }, []);

  useEffect(() => {
    //Groupデータ更新時に作成者名を取得
    if (typeof Book !== 'undefined') {
      fetch(UsersAPI + '/' + Book.user_id) //api
        .then((res) => res.json())
        .then((json) => {
          setCreatedBy(json.name);
        });
    }
  }, [Book]);

  useEffect(() => {
    //Groupデータ更新時に紐づけされてる問題を取得
    getQuestionInBook();
  }, [Book]);

  useEffect(() => {
    //Groupデータ更新時に紐づけされてる問題を取得
    if (typeof Book !== 'undefined') {
      fetch(QuestionsAPI) //api
        .then((res) => res.json())
        .then((json) => {
          if (Array.isArray(json)) {
            setQuestions(json);
          } else {
            setQuestions([]);
          }
        });
    }
  }, [Book]);

  const EditBookFetch = () => {
    //Group編集用Fetch
    fetch(BooksAPI + '/' + param['id'], {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: editBookPostData.name,
        summary: editBookPostData.summary,
        access_key: editBookPostData.access_key,
        user_id: editBookPostData.user_id,
      }),
    }) //api
      .then((res) => res)
      .then(() => {
        getBookDataFetch();
      });
  };

  const EditBookCheck = () => {
    if (confirm('編集を保存しますか？')) {
      EditBookFetch();
      setIsOpenModal(false);
      // console.log(EditGroupPostData);
    }
  };

  return (
    <div>
      <PageTitle color='red'>教材詳細</PageTitle>

      {Book ? (
        <DetailCard>
          <DetailCardContent>
            <div>
              <Label>教材名</Label>
              {Book.name}
            </div>
            <div>
              <Label>作成者</Label>
              {createdBy}
            </div>
            <div>
              <Label>アクセスキー</Label>
              {Book.access_key}
            </div>
            <div>
              <Label>作成日</Label>
              {Book.created_at}
            </div>
          </DetailCardContent>
          <DetailCardSummary title='教材詳細情報' text={Book ? Book.summary : ''} />
          <DetailCardButtons>
            <PrimaryButton color='secondary' sizeX='large' sizeY='small' onClick={() => setIsOpenModal(true)}>
              編集
            </PrimaryButton>
          </DetailCardButtons>
        </DetailCard>
      ) : (
        ''
      )}
      <PageSubTitle color='orange'>教材内問題一覧</PageSubTitle>

      <EditRelationButtonList
        onAdd={() => registerQuestion()}
        onDelete={() => removeQuestion()}
        onChange={(e) => {
          QuestionPostChange(e.target.value);
        }}
        label='教材名'
      >
        {Questions
          ? Questions.map((data) => (
              <option value={data.question_id} key={data.question_id}>
                {data.name}
              </option>
            ))
          : ''}
      </EditRelationButtonList>

      {questionInBook ? (
        <InfoCardList>
          {questionInBook.map((data) => {
            return <QuestionInfo data={data.question} key={data.question_id}></QuestionInfo>;
          })}
        </InfoCardList>
      ) : (
        ''
      )}

      {/* Modal*/}
      {isOpenModal ? (
        <EditBookModal
          onChange={setEditBookPostData}
          onSave={EditBookCheck}
          users={Users}
          postData={editBookPostData}
          onClose={() => setIsOpenModal(false)}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default BookDetail;