let vm = new Vue({
    el: '#app',
    data: {
        program_data: [],
        ytplay_flg: false,
        cur_video_id: "",
        themes: [],
        searched_program: [],
        sort_flg: 'd',  // ascending or decending
        book_json: []
    },
    methods: {
        playYT: function(video_id) {
            console.log(this.ytplay_flg)
            if (this.ytplay_flg === true && this.cur_video_id === video_id) {
                this.ytplay_flg = false;
            } else {
                this.ytplay_flg = true;
                this.cur_video_id = video_id;
                console.log(video_id);
                //ytPlayer.cueVideoById(video_id.replace('/watch?v=', ''));{videoId: videoId}
                ytPlayer.cueVideoById({videoId: video_id.replace('/watch?v=', '')});
            }
            
        },
        closeYT: function() {
            ytPlayer.stopVideo();
            this.ytplay_flg = false;
        },
        episode_num: function(num){
            if (num.indexOf('ex.')) {
                return '#' + Number(num)
            } else {
                return '#ex.' + Number(num.substr(3)) 
            }
        },
        modify_themes: function() {
            let l = this.themes.length;
            dx = 3 - l%3;
            for (i=0; i<dx; i++) {
                this.themes.push([])
            }
        },
        search_theme: function(theme_id) {
            
            let temp = []
            this.searched_program = this.program_data.filter( function( value, index, array ) {
                return value.theme_id === theme_id;       
            }, theme_id)
            
            this.sort_flg = 'a'
            this.sort_program(this.sort_flg)
            $('#myModal').modal('hide');
        },
        display_all: function(p_no) {
            this.searched_program = this.program_data
            this.sort_program(this.sort_flg)
        },
        sort_program: function() {
            this.searched_program.sort(function(a,b){
                if( a.delivery_date < b.delivery_date ) {
                    return -1;
                } else if( a.delivery_date > b.delivery_date ) {
                    return 1;
                } else {
                    if (a.num < b.num) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
            if (this.sort_flg === 'd') {
                this.searched_program = this.searched_program.reverse();
            }
        },
        sort_change: function() {
            if (this.sort_flg === 'd') {
                this.sort_flg = 'a';
            } else {
                this.sort_flg = 'd';
            }
            this.sort_program(this.sort_flg);
        },
        theme_books: function(id) {
            console.log(id)
            return this.book_json.filter( function( value, index, array ) {
                return value.id === id;       
            }, id)
        }
    },
    mounted: function() {
        axios
            .get('./program_select.php')
            .then( response => {
                this.program_data = response.data;
                this.searched_program = this.program_data
                this.display_all(this.sort_flg)
            })    
            .catch(function(error) {
                console.log(error);
            });
        axios
            .get('./theme_select.php')
            .then( response=> ( this.themes = response.data ))
            .catch(function(error) {
                console.log(error);
            });
        axios
            .get('./book_select.php')
            .then( response=> ( this.book_json = response.data ))
            .catch(function(error) {
                console.log(error);
            });
        

    },
    created: function () {
        
        
    }
})


// YouTube Player APIを読み込む
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ytPlayer;
// API読み込み後にプレーヤー埋め込み
// When You Tube API is ready, create a new 
// You Tube player in the div with id 'player'
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('ytarea', 
      {
          videoId: 'FvCf8xYLYuA',   // Load the initial video
          width: 250,
          height: 190,
          playerVars: {
                 autoplay: 0,      // Don't autoplay the initial video
                 rel: 0,           //  Don’t show related videos
                 theme: "light",   // Use a light player instead of a dark one
                 controls: 1,      // Show player controls
                 showinfo: 0,      // Don’t show title or loader
                 modestbranding: 1 // No You Tube logo on control bar
          }
      });
  
}