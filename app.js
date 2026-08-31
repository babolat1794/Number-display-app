let isRunning = true;
let timer = null;

// 初期表示時間（デフォルトは5秒）
let currentDisplayTime = 5000;

// ランダム桁数の数字を生成（1〜10桁）＋3桁ごとにコンマ区切り
function generateRandomNumber() {
    const length = Math.floor(Math.random() * 10) + 1; // 1〜10桁
    let num = "";
    for (let i = 0; i < length; i++) {
        num += Math.floor(Math.random() * 10);
    }

    // 数字を3桁ごとにコンマ区切り
    return Number(num).toLocaleString("ja-JP");
}

// 数字を表示し続けるメイン処理
function startSequence() {
    const display = document.getElementById("number-display");

    function showNext() {
        if (!isRunning) return;

        const num = generateRandomNumber();
        display.textContent = num;

        timer = setTimeout(showNext, currentDisplayTime);
    }

    showNext();
}

// 停止／再開ボタン
document.getElementById("toggle-btn").addEventListener("click", () => {
    const btn = document.getElementById("toggle-btn");

    if (isRunning) {
        isRunning = false;
        clearTimeout(timer);
        btn.textContent = "再開";
    } else {
        isRunning = true;
        btn.textContent = "停止";
        startSequence();
    }
});

// 終了ボタン（PWAではホーム画面に戻る動作）
document.getElementById("end-btn").addEventListener("click", () => {
    window.close();
    location.href = "about:blank";
});

// 表示時間選択ボタン（5秒・7秒・9秒）
document.querySelectorAll(".time-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentDisplayTime = Number(btn.dataset.time);
    });
});

// 初回起動
startSequence();
