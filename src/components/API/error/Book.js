export const getBookErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '教材取得に失敗しました。該当教材が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const getBooksErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材一覧取得に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '教材一覧取得に失敗しました。教材が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材一覧取得に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const createBookErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材作成に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '教材作成に失敗しました。APIが見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材作成に失敗しました。定義されていないエラーです。'};
    }
  }
};

export const deleteBookErrorCatch = (status) => {
  switch (status) {
    case -1: {
      return {status: 'fail', content: 'ネットワークエラーです。VPNの接続状況などを確認してください。'};
    }
    case 400: {
      return {status: 'fail', content: '教材削除に失敗しました。API側でエラーが発生しました。'};
    }
    case 404: {
      return {status: 'fail', content: '教材削除に失敗しました。該当教材が見つかりません。'};
    }
    default: {
      return {status: 'fail', content: '教材削除に失敗しました。定義されていないエラーです。'};
    }
  }
};
