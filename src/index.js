import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  // const deleteTarget = deleteButton.parentNode; これはbuttonタグの親要素
  //これはターゲットなので引数にする為、今回は削除する。
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数　（インプットボックスからとcomplete-listから追加する）
// この2つからで違うのは入力されている値だけ
const createIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  // button（完了）タグ作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode); //この関数は下で定義している。

    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode; //list-rowのdivタグを取得
    //addTargetの中の 最初の子要素liの文章だけを取得する。
    const text = addTarget.firstElementChild.innerText;

    //divより下を初期化。completelistでは完了と削除ボタンは不要なため。divタグは使い回したい
    addTarget.textContent = null;

    //完了したTODO内のdiv内のliタグ生成
    const li = document.createElement("li");
    li.innerText = text; //26行目のtextを入力する

    // 完了したTODO内のdiv内のbuttonタグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ(div)を完了リストから削除
      const deleteTarget = backButton.parentNode; //戻すボタンのdivタグ取得
      document.getElementById("complete-list").removeChild(deleteTarget);

      //戻すボタンの中の文章を取得する
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    // divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    //完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button（削除）タグ作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode); //この関数は下で定義している。
  });

  // divタグの子要素にliなどを入れる divの中に完了、削除ボタンが入る
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加 ulの中にdivを入れる
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
