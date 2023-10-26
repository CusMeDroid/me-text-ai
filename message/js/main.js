let url = 'https://docs.google.com/spreadsheets/d/1ex4zW0WxE3dP7UhtqNrhxY7ufvTWEroau_J_gq-8awM/gviz/tq?';
const lkjs = document.querySelector('.lkjs');
const query = encodeURIComponent('Select B,C,D');
var coll = document.getElementsByClassName("collapsible");
console.log(query);
url = url + '&tq=' + query;

fetch(url)
.then(res => res.text())
.then(rep => {
    const data = JSON.parse(rep.substr(47).slice(0,-2));
    const container = document.createElement('div');
    data.table.rows.forEach((main)=>{
        lkjs.append(container);
        console.log(main.c[0]);
        const kategori = main.c[0];
        console.log(main.c[1]);
        const judul = main.c[1];
        console.log(main.c[2]);
        const deskripsi = main.c[2];
        const mJudul = judul.v;
        const mKategori = kategori.v;
        const mDeskripsi = deskripsi.v;

        const mButton = document.createElement('button');
        mButton.setAttribute('class', 'collapsible');
        mButton.innerHTML = mJudul;

        const mContent = document.createElement('div');
        mContent.setAttribute('class', 'content');

        const mParaf1 = document.createElement('pre');
        mParaf1.setAttribute('class', 'patobo-8');
        mParaf1.innerHTML = mKategori+"<br"+mDeskripsi;

        container.appendChild(mButton);
        container.appendChild(mContent);
        mContent.appendChild(mParaf1);
        for (data.table.cols = 0; data.table.cols < coll.length; data.table.cols++) {
            coll[data.table.cols].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight){
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    })
    console.log(data);
})
