const pieces = {
    "-1": "⬛",
    0: "⭕",
    1: "❌"
};

const letters = ["a", "b", "c"];

module.exports.exec = async ({ Luna, message, args }) => {
    if (!args.length) return "Who do you want to play against?";

    const member = Luna.fetchMember(message, args[0]);
    if (!member) return "That's not a valid member!";
    if (member.bot) return "Bots aren't intelligent enough to play!";
    if (member.id === message.author.id) return "You can't play yourself!";

    const players = Luna.shuffle([Luna.fetchMember(message, message.author.id), member]);
    let board = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];
    
    const winner = await mainLoop(Luna, players, board, 1, message);
    if (winner === -1) return "It's a tie! Wanna play again?";
    return `${players[winner].mention} has won the game!`;
};

module.exports.props = {
    name: "tictactoe",
    aliases: ["ttt"],
    cat: "games",
    description: "Challenge a server member to a friendly game of Tic-Tac-Toe!",
    perms: ["sendMessages", "embedLinks"],
    usage: "<opponent>",
    cd: 1e+4
};

async function mainLoop(Luna, players, board, turn, message) {
    message.channel.createMessage(`${players[turn].mention}, where do you want to go? Use **a - c** for the **row** and **1 - 3** for the **column**. Like this: \`a1\`.`);

    const filter = msg => {
        const coords = msg.content.toLowerCase().split("");
        return msg.author.id === players[turn].id && letters.includes(coords[0]) && ["1", "2", "3"].includes(coords[1]) && board[letters.indexOf(coords[0])][["1", "2", "3"].indexOf(coords[1])] === -1;
    };
    const res = await Luna.collectors.awaitMessages(message.channel, filter, { time: 10000, maxMatches: 1 });
    if (!res.length) {
        message.channel.createMessage("Too slow! Time has expired!");
        return turn === 1 ? 0 : 1;
    };

    const coords = res[0].content.toLowerCase().split("");
    board[letters.indexOf(coords[0])][["1", "2", "3"].indexOf(coords[1])] = turn;

    message.channel.createMessage({ embed: {
        title: "✏ | Tic Tac Toe",
        description: board.map(row => row.map(col => pieces[col]).join("")).join("\n"),
        footer: { text: `${players[turn].username}'s turn`},
        color: Luna.color()
    }});

    if (checkWin(board)) return checkWin(board);

    return await mainLoop(Luna, players, board, turn === 1 ? 0 : 1, message);
};

function checkWin(board) {
    for (let i = 0; i < board.length; i++) if (board[i][0] > -1 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
    for (let j = 0; j < board.length; j++) if (board[0][j] > -1 && board[0][j] === board[1][j] && board[1][j] === board[2][j]) return board[0][j];
    if (board[0][0] > -1 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
    if (board[0][2] > -1 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];

    let open = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) if (board[i][j] === -1) open++;
    };
    if (!open) return -1;
    return null;
};