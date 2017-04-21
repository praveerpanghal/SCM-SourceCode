   app.service('SuccessError', function($q){ 

        this.Successresult = function(response) {  
           

            if (response.data!==null && typeof response.data === 'object') {

                return response.data;
            } 
            else  if (response.data!==null && typeof response.data === 'string') {

                return response.data;
            } 
            else  if (response.data!==null && typeof response.data === 'number') {

                return response.data;
            } 
              else  if (response.data!==null && typeof response.data === 'boolean') {

                return response.data;
            }
              else  if (response.data!==null && typeof response.data == 'function') {

                return response.data;
            }
             else  if (typeof response.data == 'undefined') {

                return response.data;
            }
            else {  

                return $q.reject(response.data);
            }
        } 

      this.Errorresult = function(response) { 
         
            return $q.reject(response.data);
        }

    }); 

    