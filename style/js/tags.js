---
---

var selectTags = []

var site_tags = []
{% for tag in site.data.tags %}
    site_tags.push('{{tag}}');
{% endfor %}


function searchwithTag(){
    var tagResults = document.getElementsByClassName('post-lists-body')[0];

    var appendString = '';
    {% for post in site.posts %}
        var postTags = [];
        {% for i in post.tags %}
            postTags.push('{{i}}')
        {% endfor %}
        if (selectTags.length <= postTags.length && selectTags.length != 0){
            var temp = 0;
            for (var j in selectTags){
                if (postTags.indexOf(selectTags[j]) < 0){
                    temp = 1; 
                }
            }
            if (temp == 0){
                appendString += `
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
    
        }

    {% endfor %}

    tagResults.innerHTML = appendString;

}


var checkbox = document.getElementsByClassName('checkbox');

for (var i = 0; i < checkbox.length; i++){
    checkbox[i].addEventListener('change', (e)=>{
        if (e.target.checked == true){
            selectTags.push(e.target.id);
        }
        else{
            let pos = selectTags.indexOf(e.target.id)
            selectTags.splice(pos, 1);
        }
        searchwithTag()
    })
}

