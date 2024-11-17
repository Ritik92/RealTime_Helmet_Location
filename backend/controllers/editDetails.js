exports.editDetails = async(req, res) => {
    try{
       
        
        return res.status(200).json({
            success: true,
            message: "Details Edited Successfully"
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error Occured."
        });
    }
};