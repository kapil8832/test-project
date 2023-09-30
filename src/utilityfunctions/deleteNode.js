function deleteNode(nodes,edges, questions, id) {
    const nodes = {...nodes} ;
    const edges = {...edges} ;
    const questions = {...questions} ;
    let id = id ;

        while(true){
            if(questions.id.data.followUp.length===0){
                break ;
            }else{
               id =  questions.id.data.followUp[0] ;
               delete questions[id]
            }
        }

}

