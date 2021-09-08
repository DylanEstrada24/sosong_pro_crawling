let success;
let msg;
let code;
let data;


function ApiResponse(arg1, arg2, arg3){

    if(arguments.length === 1){

        this.success = false;
        this.code = Object.keys(arg1)[0]
        this.msg = Object.values(arg1)[0]

        return {
            success: this.success,
            code : this.code,
            msg : this.msg,
        }

    } else if (arguments.length === 2) {
        this.success = arg1;
        this.msg = arg2;

        return {
            success : this.success,
            msg : this.msg,
        }

    } else if (arguments.length === 3){
        this.success = arg1;
        this.msg = arg2;
        this.data = arg3;

        return {
            success : this.success,
            msg : this.msg,
            data : this.data
        }
    }
}

module.exports = { ApiResponse};