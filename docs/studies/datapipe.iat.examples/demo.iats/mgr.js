define(['managerAPI', 'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'], function(Manager) {

    let API = new Manager();

    API.setName('mgr');
    API.addSettings('skip',true);
	init_data_pipe(API, 'MJGly1jNf9pUnhFIS5rOuqAktUzyfIZXVb81A3rsrD5S0Tr19GKFrggwp96cLID2kUn4OU',  {file_type:'csv'});	


    API.addTasksSet({
        choose: [{
            type: 'quest',
            name: 'choose',
            scriptUrl: 'choose.js'
        }],

        weight: [{
            type: 'time',
            name: 'weight',
            scriptUrl: 'https://baranan.github.io/minno-tasks/studies/datapipe.iat.examples/demo.iats/weight.js'
		
        }]
    });

    API.addSequence([
	    {
	        mixer:'repeat',
	        times:10, 
	        data :
	        [
	            {inherit:'choose'},
	            {
	                mixer:'multiBranch', 
	                branches :
	                [
	        
	                    { 
	                        conditions:[{compare: 'global.choose.questions.choice.response', to: 'weight'}],
	                        data:[{inherit:'weight'}]
	                    }
	                ]
	            }
	       ]
	    }
    ]);

    return API.script;
});
