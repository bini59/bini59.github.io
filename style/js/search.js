---
---

var input = document.getElementById("SearchWord");

input.addEventListener("keyup", (event)=>{
    var result = ``
    {% for post in site.posts %}
        if(searching(event.target.value, '{{post.title}}')){
            result += `
            <div class="post-list-item">
                <div class="post-list-item-container">
                    <div class="item-label">
                        <div class="item-title"><a href="{{ post.url }}">{{ post.title }}</a></div>
                        <div class="item-meta clearfix">
                            <div class="item-meta-date"> {{ post.date | date: "%b %d, %Y" }} </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    {% endfor %}

    document.getElementsByClassName("post-lists-body")[0].innerHTML = result;
});



function searching(input, word){
    var word = removeEmpty(word);
    var input = removeEmpty(input);

    for (var i = 0; i < word.length; i++){
        if(i + input.length > word.length){break;}
        if(word.slice(i, i+input.length) == input){
            return true;
        }
    }

    return false

}

function removeEmpty(word){
    var word = word.split(' ');
    var result = '';
    for(var i in word){
        result += word[i];
    }

    return result;
}