let fetchData = []
let fetch4 = [];
let count = 0;
async function myFunction() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response => response.json())
        .then(users => {
            let output = "";
            users.forEach(function (user) {
                output = `${user.title}`;
                fetchData.push(output);
            });
            let fetch4 = fetchData.slice(0, 4);
            localStorage.setItem('title', JSON.stringify(fetch4));
            for (let i = 0; i < 4; i++) {
                let wish = JSON.parse(localStorage.getItem("title"))[i];
                let w = document.createElement('div')
                w.innerHTML = `<div class="wishes" onclick="wishcall(event)">
                <p class="wishtext" value="${i}">${wish}</p>
                </div>`
                document.getElementById("fetchdata").append(w);
                count++;
                document.getElementsByClassName("footerpara")[0].innerHTML = `You have ${count} pending tasks.`
            }
        });
}
let local = JSON.parse(localStorage.getItem("title"));
if (local === null) {
    myFunction();
} else {
    for (let i = 0; i < JSON.parse(localStorage.getItem("title")).length; i++) {
        let wish = JSON.parse(localStorage.getItem("title"))[i];
        let w = document.createElement('div')
        w.innerHTML = `<div class="wishes" onclick="wishcall(event)">
        <p class="wishtext" value="${i}">${wish}</p>
        </div>`
        document.getElementById("fetchdata").append(w);
        count++;
        document.getElementsByClassName("footerpara")[0].innerHTML = `You have ${count} pending tasks.`
    }
}

function add() {
    let wish = document.getElementById("wish1").value.trim();
    if (wish === "" || wish.length === 0) {
        document.getElementById('wish1').classList.add('border');
        alert("Ohh Man! Wish Shouldn't Be Empty!")
    } else {
        document.getElementById('wish1').classList.remove('border');
        fetch4.push(wish);
        localStorage.setItem('title', JSON.stringify(fetch4));
        let wishtext = document.getElementById('wishlist');
        wishtext.innerHTML += `<div class="wishes" onclick="wishcall1(event)">
        <p class="wishtext" value="${wish}">${wish}</p>
        </div>`;
        count++;
        document.getElementsByClassName('footerpara')[0].innerHTML = `You Have ${count} pending tasks`;
        document.getElementById("wish1").value = "";
    }
}

function wishcall(evt) {
    for (let j = 0; j < document.getElementsByClassName('wishtext').length; j++) {
        let percent = parseInt(evt.target.getAttribute("value"));
        if (percent === parseInt(document.getElementsByClassName('wishtext')[j].getAttribute("value"))) {
            let str = document.getElementsByClassName('wishtext')[j].classList.value;
            if (str.includes("line")) {
                document.getElementsByClassName('wishtext')[j].classList.remove("line");
                count++
                document.getElementsByClassName('footerpara')[0].innerHTML = `You Have ${count} pending tasks`;
            } else {
                document.getElementsByClassName('wishtext')[j].classList.add("line");
                count--;
                document.getElementsByClassName('footerpara')[0].innerHTML = `You Have ${count} pending tasks`;
            }
        }
    }
}

function wishcall1(evt) {
    for (let j = 0; j < document.getElementsByClassName('wishtext').length; j++) {
        let percent = evt.target.getAttribute("value");
        if (percent === document.getElementsByClassName('wishtext')[j].getAttribute("value")) {
            let str = document.getElementsByClassName('wishtext')[j].classList.value;
            if (str.includes("line")) {
                document.getElementsByClassName('wishtext')[j].classList.remove("line");
                count++
                document.getElementsByClassName('footerpara')[0].innerHTML = `You Have ${count} pending tasks`;
            } else {
                document.getElementsByClassName('wishtext')[j].classList.add("line");
                count--;
                document.getElementsByClassName('footerpara')[0].innerHTML = `You Have ${count} pending tasks`;
            }
        }
    }
}

function reset() {
    count = 0;
    document.getElementsByClassName('footerpara')[0].innerHTML = `You Have ${count} pending tasks`;
    document.getElementById('wishlist').innerHTML = "";
    document.getElementById('wish1').classList.remove('border');
    document.getElementById("wish1").value = "";
    document.getElementsByClassName("footerpara")[0].innerHTML = "";
    localStorage.clear();
}