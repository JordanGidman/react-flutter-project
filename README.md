React Flutter Dice Game!

This is my dice game project. The aim of the game is to get all dice to be locked with the same number. You can bet on the amount of rolls you think this will take and you will either win or lose money in your "balance" 
depending on the outcome. Odds are locked at 2/1. The app is very self explanitory so i dont think an explantion of how to use it is necessary. 

BUILDING THIS PROJECT: 
This like many of my projects is built as a learning experience for myself. After i learn something new i like to play with it to really drive the concepts home in my mind. I have utilized state in this application for the money for the dice faces and much more, I have also used derived state to pass state as props down the component tree to its child dice components to prevent each dice needing its own state variable to keep track of whether
it should be held or not. 

As i have now learned a lot more about useEffect i am also using that to listen for the game being won and having the UI react accordingly to the win condition being met. Using the dice as its dependancy array this hook can 
monitor for all the dice being held to determin the win condition.
