Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function takeSnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    })
    console.log('ml5 version:',ml5.version);
    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NwmrA_MFS/model.json',modelLoaded);
}
function modelLoaded()
{
    console.log("Model Loaded");
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data="Prediction is "+prediction;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function checkEmotion()
{
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error,results)
{
    if (error)
    {
        console.error(error);
    } else
    {
        console.log(results);
        prediction=results[0].label
        document.getElementById("result_gesture_name").innerHTML=prediction;
        speak();
        if (prediction=="Nice")
        {
            document.getElementById("update_emoji").innerHTML="&#128076;";
        } else if (prediction=="Thumbs Up")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        } else if (prediction=="Peace")
        {
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
    }
}