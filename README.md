** calculator design desicions **
 - Not using input field
    - Classic 4 function calculator did not have text input
    - Too difficult to deal with parsing random chars (i.e.: "*#$anwi.q.323.")
 - Overflow at 15 chars
    - just what happens to fit in my div display box
    - if user inputs #/. when display is full, do nothing
    - if answer exceeds 15 chars, say overflow
 - Store the previous answer
    - i.e.: user types "1 + 3 = ", then types "- 2 = " the display will show 2 (1 + 3 - 2 = 2)
 - User can change operation until they press = 
    - i.e.: user press "+" then types the second number then hits "-" before "=", will do subtraction
 - User can hit a operator and equals without a second number and calculator will use the first input twice (num += itself, num *= itself)
    