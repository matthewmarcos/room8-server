#### Account Creation ####

printf "Starting to create userc"
    curl \
    --request POST \
    --data "username=userc&password=password&email=userc%40email.com&nickname=Matthew" \
    http://localhost:5001/auth/register

sleep 1

#### Login ####
printf "Logging In!\n"
    curl \
    --request POST \
    --cookie-jar ./cookies \
    --data "username=userc&password=password" \
    http://localhost:5001/auth/login
printf "\nFinished Loggin In!\n"

sleep 2
#### UPDATING USER ####
printf "\bEditing userc\n"
#### Editing User Profile ####
printf "\nuserc: Shookt! Editing Profile\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "fullName=Matthew%20Marcos&status=I%20have%20a%20room&cleanliness=10&sex=Male&smoker=No&hasOrg=No&gender=Steel%Dragon&course=BS%20Computer%20Science&batch=2013&birthday='12-14-1996'&contactNumber=09123456789&bio=Bio%20here&nickname=matthew&email=userc%40gmail.com" \
    http://localhost:5001/api/profile
sleep 0.5

#### Editing User Preferences ####
printf "\nuserc: Shookt! Inserting Utilities\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "airconditioning=Yes&laundry=Yes&cooking=Yes&gasStove=Yes&electricStove=Yes&microwave=Yes&waterKettle=Yes&internet=Yes&torrent=Yes&speedRequirement=0" \
    http://localhost:5001/api/preferences/utilities
sleep 0.5

printf "\nuserc: Shookt! Inserting When\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "duration=End%20of%20semester&startDate=2014-04-28" \
    http://localhost:5001/api/preferences/when
sleep 0.5

printf "\nuserc: Shookt! Inserting Cost\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "rentPriceRangeStart=3500&rentPriceRangeEnd=5000&shouldIncludeUtilities=Yes&utilitiesPriceRangeStart=0&utilitiesPriceRangeEnd=1500" \
    http://localhost:5001/api/preferences/cost
sleep 0.5

printf "\nuserc: Shookt! Inserting Sex\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "sex=Male" \
    http://localhost:5001/api/preferences/sex
sleep 0.5

printf "\nuserc: Shookt! Inserting Misc\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "curfew=Yes&curfewTime=22:00:00&message=Some%20asdasdrandom%20message%20here%20makes%20these%20things%20awesome" \
    http://localhost:5001/api/preferences/misc
sleep 0.5


printf "\nuserc: Shookt! Inserting Location\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "nearbyRestaurants=Yes&travelTimeToUplb=15&generalLocation=Raymundo" \
    http://localhost:5001/api/preferences/location
sleep 0.5


printf "\nuserc: Shookt! Inserting Lifestyle\n";
    curl \
    --request PUT \
    --cookie ./cookies \
    --data "alcohol=Yes&cleanliness=10&smokers=No&studyTime=Morning&guestsInRoom=Yes&guestsStudyArea=Yes&pets=Yes&org=Yes" \
    http://localhost:5001/api/preferences/lifestyle
sleep 0.5

printf "\nuserc: Fnished! Logging out!\n";

#### Logout ####
    curl \
    --request POST \
    --cookie ./cookies \
    http://localhost:5001/auth/logout
printf "\nuserc: Fnished!\n\n";
sleep 0.5

