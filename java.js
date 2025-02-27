let currentScene 
let opening = ""
let trailMixDeaths = 0//for the other true ending. counts how many times you ahve died trail-mix related deaths.
let num = Math.floor(Math.random()*10)

const input = document.querySelector("input");
let codenum = []//For the true ending

if (num ==1){// Randomizes the intro sequence
    opening = "REMINDER: Don't refresh the page, there are endings that affect other endings. "
}else if (num ==2){
    opening = "You are relaxing, doomscrolling while the news is on at low volume on the TV. "
}else if(num==3){
    opening = "You are doomscrolling. You begin to realize that time is finite, and that every second you spend on instagram reels is another one wasted. You begin to think of some serious changes that you could implement in your life. "
}else if(num==4){
    opening = "You are relaxing. Chillin', even. One could even say you were straight up Hangin' Loose. This is because you were watching the spurs absolutely cook the phoenix suns on a monday night. "
}else if(num==5){
    opening = "Please don't refresh the page at any point in this adventure. "
}else {
    opening = "You are relaxing on a monday night. "
}
let sceneList = {//List of all the scenes. index 0 is the story text. next is the image, then the option choices followed by where they lead.
    "Start":[ opening + "Suddenly, the president comes on TV to announce that a deadly virus has been let loose all across the world. Luckily for you, there is a secure vault only miles from your home. You have no car, but you can take two of the following items with you on your journey. Which do you choose?","zombie.webp","A mask","A potted plant","A baseball bat","A bag of trail mix","Mask","Plant","Bat","Mix"],
    "Mask":["You have chosen the mask. it will ensure you don't catch the airborne plague.","Mask.png","A Potted Plant (this has to be useful)","A baseball bat","A bag of Trail Mix","MPlant","MBat","MMix"],
    "Plant":["You have, for some reason, chosen to take a potted plant with you on a potentially perilous journey to a secure vault. You get to bring one more thing.","msplant.png","A Mask","A STEEL baseball bat", "A bag of delicious Trail mix", "Give up now because you brought a plant with you","MPlant","Death","Death","Start"],
    "Death":["You stepped outside and immediately died because this is an airborne disease and you are not wearing a mask. Good Job","Death.avif","Try again","Start"],
    "Bat":["You have wisely decided to take a weapon with you. you get to bring one more thing.","Bat.jpg","A mask","A potted plant (don't pick this)","A bag of Trail Mix","MBat","Death","Death"],
    "Mix":["You have chosen to bring something to eat with you. hopefully the Zombies can't smell it. What else will you bring?","mix.webp","A mask","A potted plant (why?)","A baseball bat","MMix","Death","Death"],
    "MPlant":["As you exit your house, a Zombie confronts you. It stares at the potted plant you are clutching and begins to smile.","question.png","threateningly hold out the plant","Pretend to be a zombie", "run into the woods","Laugh","Pretend","Freewill"],
    "Laugh":["The Zombie begins to laugh hysterically, pointing at your plant and crying. It looks at you and says \"You must be a zombie, theres clearly no brain in there!\" You realize you could join the zombies on their quest to eat brains.","zombiepeace.webp","Join him.","throw plant at him","run into the woods, with all of your dignity gone.","Comedy","Killed","Freewill"],
    "Comedy":["You travel with the zombie to their camp. You pretend to be zombie for many days, but something about zombies, is that they don't sleep, and they don't wear masks. Eventually, you ar eno longer pretending.","Death.avif","Try again","Start"],
    "Pretend":["You take a bite of a leaf and mutter \"Brains\" multiple times. The Zombie doesn't buy it at all.","question.png","Try again","Start"],
    "Killed":["Your futile attempts at combat were easily thwarted by the undead beast. The Zombie enjoys a feast of Brains. I say a feast, but judging that terrible decision, it was more of a snack.","question.png","Try again","Start"],
    "Freewill":["You run into the woods. as you run, you trip and drop your \"second item\". You still have a mask though. You make it to a clearing where you see a jeep, with no (alive) owner in sight. The keys are on the ground next to it. What do you do?","Jeep.png","Did you seriously give us the illusion of being able to pick two of four items, only to immediately \"drop\" our \"second item?\" You didn't even make separate nodes for each of the things we dropped. This totally breaks my immersion in this very realistic experience.", "Attempt to get in the jeep and drive to the vault.","Munch on some trailmix while you decide","Meta","Jeep","ImaginaryEat"],
    "Meta":["You begin questioning your reality. How could an airborne illness turn people into zombies? How can I not remember what item I dropped in the woods? I only picked two!","eeriewoods.webp","You begin to go insane.","Insanity"],
    "Insanity":["The voices begin speaking. They seem to say the word \"TRAILMIX\" over and over again. Eventually, you succumb to the insanity. You realize you should come back to this path when you know more about the world, perhaps then your brain could comprehend the true nature of reality. Actually, don't do that.","trailmixhell.png","Try again","Start"],
    "MBat":["As you exit your home, you come face to face with a zombie. What do you do?","decision.webp","Attack the Zombie with your baseball bat","Run into the woods","Battle","Freewill"],
    "MMix":["As you exit your home, you lock eyes with a zombie in the house across the street. What do you do?","house.avif","run into the woods","run to a nearby shopping center","eat some trail mix as you ponder what to do.","Freewill","Parking","Eat"],
    "Eat":["You take off your mask to eat the trail mix. Im sure you see the immediate problem there. the airborne virus transforms you into a zombie.","Death.avif","Try again","Start"],
    "Parking":["You run all the way to the shopping center and hide between two parked cars. You look towards the gocery store and see two trucks of survivors loading up on supplies. What do you do?","question.png","Munch on some trailmix while you ponder what to do","Run over to the heavily armed strangers and ask for a ride to the vault","break into the car next to you and try and hotwire it.", "Eat","Trucks","Alarm"],
    "Alarm":["The car alarm sounds. You faintly hear a rocket launcher fire before you are freed from this world.","kaboom.","Try again","Start"],
    "Trucks":[" You approach the strangers while yelling \"I'm Human!\" They seem overjoyed and invite you to come with them to the vault. You help them gather supplies from the store and then you all load into the trucks. You are sitting on top of an official looking safe, you can try to open it if you want. It'll be a while before you make it to the vault, what should you do?","safeimage.png","Offer the other people on your truck the trailmix","keep quiet and watch for zombies.","Try to enter code","GroupEat","Vault","Code"],
    "GroupEat":[" You all take of your masks to enjoy the trail mix. You all immediately fall victim to the virus. You have successfully doomed an entire truck of survivors. If your goal was to harm as many people as possible, congratulations!","Death.avif","Try again","Start"],
    "Vault":["CONGRATULATIONS! You made it to the vault, and are now celebrating your survival with the rest of the survivors. Don't worry though, there are more endings to this choose-your-own adventure.","congrats.png"],
    "TRUEENDING":["You have successfully died of trying to eat trailmix three times. The bag of trail mix reveals itself as the elder deity that it truly is. You must now refresh the page to restart all progress.","TRUEENDING.png"],
    "Battle":["You easily defeat the Zombie. As it turns out, one head is better than none. What do you do?","batblood.png","Stroll through the streets ready to kill any zombie","Look for survivors in the nearby shopping mall","Cocky","Survivors"],
    "Cocky":["It turns out, one head is better than none, but not when the other is holding a gun.","jason.png","Try again","Start"],
    "Survivors":["You enter a shopping center parking lot. You see two trucks of survivors loading up on supplies at the local grocery store. What do you do?","question.png","Approach them","smash the window of the car next to you and attempt to hotwire it.","Jason","Alarm"],
    "Jason":["You look a lot like a zombie holding a baseball bat. You are unalived on sight by the survivors. They will never know you were a human","jason.png","Try again","Start"],
    "Jeep":["CONGRATULATIONS! You successfully drive the jeep to the vault and survived the apocalypse. It has been difficult, but you have overcome many challenges to get here. Good Job.","Fakeout.png","Continue to recieve your reward","BRUH"],
    "BRUH":["You really thought that was the end. You really thought that the ending of this adventure was running away from the only danger, stumbling through the woods, finding an unlocked car, and then just driving that car to the end of the game? Is that all a win is worth to you? No. I refuse to allow it. \"Continue and recieve your reward.\" How could you believe that for a second? On one hand there is obviously no reward for a school project game, and secondly who would ever reward anyone for doing the tiny, miniscule amount of effort that it took for you to make it to this ending? The only reward that wouod be worthy for such a short \"ending\" is a sticker, and thats a stretch. Go play the game again (don't refresh), and this time, find an ending that takes at least 4 or five clicks.  ","decided.webp","Go back to the start","\"Erm actually, I disagree. I do deserve a win for doing next to nothing\"","JK","BRUH2"],
    "JK":["Thank you for listening to me. On second thought, I think you do deserve a win. CONGRATULATIONS!","congrats.png","Play again","Start"],
    "BRUH2":["Very funny. \" I picked the funny option I'm so unique!\" Guess what? After playtesting this game for hours every person that tested this screen picked the funny option. And do you know what else? if you had picked \" Try again\" then you would have won! Instead, you had to argue with me, you had to pick the funny option. (Don't refresh the page) Next time, pick the other option and see what happens.","","Come back here later","Start"],
    "Cracks":["The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are star1ing to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to 4m. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. Th3 cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting 2 form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. The cracks are starting to form. ","Cracks.png","The cracks are starting to form","Start"],
    "Code":["You begin entering the code on the safe. You wonder if there is a way to find out what the code is, and if it is worth it to find out what it is. Use your keyboard to enter the rest of the code. If it is wrong, there may be dire consequences.","NUMPAD.png"],
    "ImaginaryEat":["What? You don't even have any trailmix! Regardless, you take off your mask to enjoy a snack, and are immediately consumed by the plague. You have successfully died in an area with, quite literally zero danger.","Death.avif","Try again","Start"],
    "Success":["You enter the code into the safe. inside, is a huge red button labeled \"Cure.\" You press it faster than any button you've ever pressed in your entire life. As you do drones begin to cover the sky raining down a disenfectant cure upon the land. Everyone take soff their masks and breathes in the cure, the apocalypse is over. You have won. <br>!CONGRATULATIONS!","","Play again","Start"],
    "Failure":["The safe explodes. Every survivor on board is killed, and every survivor in your area is dead. Great Job.","kaboom.jpg","Try again","Start"]



}
function doEverything(newScene){//Creates everything. Story, image, options, etc.
    if (newScene=="Eat" || newScene == "GroupEat" || newScene == "ImaginaryEat"){
        trailMixDeaths += 1//Increments for trailmix deaths
    }
    if (trailMixDeaths > 0){
        sceneList["Meta"] = ["You begin to question your own mortality. You recall a previous life where you died of taking off your mask to eat trailmix.","TRAILMIX.png","Follow the Trail mix","Insanity"]
    }
    if (trailMixDeaths >2){
        newScene = "TRUEENDING"
    }
    if (newScene=="BRUH2"){// Funny thing. 
        sceneList["JK"] = ["YOU FOOL! You really thought that coming all the way back here and picking a different option would yield you the correct ending? Guess what! I changed it with an if statement after you chose to argue with me! Now you have to refresh the page to come all the way back here and get the ending you so desperately desire. And, I might have been joking about it the whole time, you could never know. Have fun!","decided.webp"]
    }
    
    
    if (newScene == "Insanity"){// Come here twice to get the safe code.
        sceneList["Meta"] = ["You begin questioning your reality, and realize that you have been in this exact situation before. In this exact clearing, you remember that you could not remember the item that you dropped. You remember that you aksed youself how an airborne illness could turn people into zombies, but not get through a simple doctors mask. You begin to see past the veil of reality. You notice thta the cracks have started to form. You realize that the safe in you rhouse could hold the secret to the plague. You remember that the code to the safe is a four digit code. You remember that","","the cracks are starting to form","Cracks"]
    }
    /*if (safe == true && newScene == "Trucks"){
        document.addEventListener("keydown", function(e){
           if (e.key = "3"){
            doEverything("Code")
           }
        } )
    }*/
        if (newScene == "Code"){// entering the code in the safe is complicated.
            document.addEventListener("keydown",function(e){
                codenum.push(e.key)
                console.log(codenum)
                console.log(codenum.length)
                if( codenum.length== 4){
                    if (codenum[3] = "2"){
                        doEverything("Success")
                    }else {
                        doEverything("Failure")
                    }
                }
            })
        }
    currentScene = newScene // This is so I can change the scene based on the conditionals above
    let scene = sceneList[currentScene]
    
    changeText("question",scene[0])// makes the story text
    document.getElementById("image").src = scene[1]// makes the image
    changeText("options",createOptions(scene))// makes the options
    

   
    
   



        // This part adds the event listeners to the option choices.
     //I tried to optimize this by using a loop but I couldn't get it to work, believe me, I tried.
    document.getElementById("option 1").addEventListener("click",function(){
        doEverything(scene[1+(scene.length-2)/2+1])
    })
    if (scene.length >=6){
        document.getElementById("option 2").addEventListener("click",function(){
            doEverything(scene[1+(scene.length-2)/2+2])
        })
        if (scene.length >= 8){
            document.getElementById("option 3").addEventListener("click",function(){
            doEverything(scene[1+(scene.length-2)/2+3])
            })
            if (scene.length >= 10){
                document.getElementById("option 4").addEventListener("click",function(){
                doEverything(scene[1+(scene.length-2)/2+4])
                })}
        }
    }
}



function changeText(id,newText){// Just saves time
    document.getElementById(id).innerHTML = newText;
}
function createOptions(scene){// Helper function for above.
    let idnum = 1
    let str = "";
    for (i of scene.slice(2,scene.length-(scene.length-2)/2 ) ){
        str += "<li id = \"option " + idnum + "\">"+i+"</li>"
        idnum += 1
    }

    return str
}




doEverything("Start")//Initiates the game.
