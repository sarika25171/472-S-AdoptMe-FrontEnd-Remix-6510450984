import BehaviorTopic from "./behaviorTopic";

interface props {
    topic : string;
}

export default function GeneralPetHelp({topic} : props) {
    if(topic == "Allergies to Pets") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black text-xl">Although many people have discovered the beneficial effects of caring for a furry friend, the fact remains that roughly 15 to 20% of the population is allergic to animals. The result? Countless pet parents in unhappy, unhealthy situations—and their beloved pets are the cause! Allergen is the medical term for the actual substance that causes an allergic reaction. Touching or inhaling allergens leads to reactions in allergic individuals. Symptoms can include red, itchy, watery eyes and nose; sneezing; coughing; scratchy or sore throat; itchy skin, and most serious of all, difficulty breathing.
The most common pet allergens are proteins found in their dander (scales of old skin that are constantly shed by an animal), saliva, urine and sebaceous cells. Any animal can trigger an allergic response, but cats are the most common culprits. People can also become allergic to exotic pets such as ferrets, guinea pigs, birds, rabbits and rodents. There is no species or breed to which humans cannot develop allergies. Fur length and type will not affect or prevent allergies. Certain pets can be less irritating than others to those who suffer from allergies, but that is strictly on an individual basis and cannot be predicted.
Once the diagnosis of a pet allergy is made, a physician will often recommend eliminating the companion animal from the surroundings. Heartbreaking? Yes. Absolutely necessary? Not always. Keep in mind that most people are allergic to several things besides pets, such as dust mites, molds and pollens, all of which can be found in the home. Allergic symptoms result from the total cumulative allergen load. That means that if you eliminate some of the other allergens, you may not have to get rid of your pet. (Conversely, should you decide to remove your pet from your home, this may not immediately solve your problems.) You must also be prepared to invest the time and effort needed to decontaminate your home environment, limit future exposure to allergens and find a physician who will work with you. Read on for helpful tips:</h1>
                <BehaviorTopic 
                    header="Improving the Immediate Environment"
                    body=""
                    tip="1) Create an allergen-free room. A bedroom is often the best and most practical choice. By preventing your pet from entering this room, you can ensure at least eight hours of freedom from allergens every night. It's a good idea to use hypoallergenic bedding and pillow materials.
2) Limit fabrics. Allergens collect in rugs, drapes and upholstery, so do your best to limit or eliminate them from your home. If you choose to keep some fabrics, steam-clean them regularly. Cotton-covered furniture is the smartest choice, and washable blinds or shades make good window treatments. You can also cover your furniture with sheets or blankets which you can remove and wash regularly.
3) Vacuum frequently using a vacuum equipped with a HEPA (high-efficiency particulate arresting) filter or a disposable electrostatic bag. Other kinds of bags will permit allergens to blow back out of the vacuum.
4) Install an air purifier fitted with a HEPA filter. Our modern, energy-efficient homes lock in air that is loaded with allergens, so it’s smart to let in some fresh air daily.
5) Use anti-allergen room sprays. These sprays deactivate allergens, rendering them harmless. Ask your allergist for a product recommendation.
6) Clean the litter box frequently. Use low-dust, perfume-free filler. Clumping litter is a good choice.
7) Dust regularly. Wiping down the walls will also cut down on allergens.
8) Invest in washable pet bedding and cages that can be cleaned often and easily."
                />
                <BehaviorTopic 
                    header="Decontaminating Your Pet"
                    body=""
                    tip="1) Bathe your pet at least once a week. Your veterinarian can recommend a shampoo that won't dry out his skin. Bathing works to wash off the allergens that accumulate in an animal’s fur.
2) Wipe your pet with a product formulated to prevent dander from building up and flaking off into the environment. Ask your veterinarian to suggest one that is safe to use on animals who groom themselves.
3) Note any symptoms of dermatitis exhibited by your companion animal. Dermatitis often leads to accelerated skin and fur shedding, which will up your allergen exposure.
4) Brush or comb your pet frequently. It’s best to do this outdoors, if possible. (The ASPCA does not recommend keeping cats outdoors, so make sure your feline is leashed if you take him outside.)"
                />
                <BehaviorTopic 
                    header="Taking Care of Yourself"
                    body=""
                    tip="1) If possible, have someone other than yourself do the housecleaning, litter box work and pet washing, wiping and brushing. If you must clean the house or change the litter, be sure to wear a dust mask.
2) Wash your hands after handling your companion animal and before touching your face. The areas around your nose and eyes are particularly sensitive to allergens.
3) Designate a “pet outfit” from among your most easily washed clothes. Wear it when playing or cuddling with your companion, and you’ll leave other clothing uncontaminated.
4) Find a physician, preferably an allergy specialist, who will make sure that your pet is the cause of your allergies and will help alleviate your symptoms. Medications and immunotherapy (desensitizing shots) can often allow you and your companion animal to remain together happily ever after."
                />
                
            </div> 
        );
    }
    if(topic == "Cutting Pet Care Costs") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black text-xl">As responsible pet parents, we have an obligation to care for our furry friends in sickness and in health. But as pet care costs rise, how do we do what’s best for our pet? Here are a few tips to help you save money on your pet’s health care.</h1>
                <BehaviorTopic 
                    header="Schedule Regular Check-Ups"
                    body=""
                    tip="Don’t skip your pet’s yearly exam. It’s much more expensive—and risky—to treat illnesses than to protect against them. It’s also a good idea to shop veterinary practices by comparing fees for preventative care."
                />
                <BehaviorTopic 
                    header="Personalize Your Pet’s Vaccines"
                    body=""
                    tip="Some vaccines are optional, while others are essential in preventing serious diseases. Never skip any shots required by local laws or mandatory for your pet’s protection, but do talk to your vet about personalizing your pet’s vaccine protocol."
                />
                <BehaviorTopic 
                    header="Spay or Neuter Your Pet"
                    body=""
                    tip="Spaying or neutering your pet can save a lot of money by preventing serious health problems, including uterine, ovarian and testicular cancers. Many local shelters provide resources for low- or no-cost spay/neuter surgeries. Visit our online database to find a low-cost program in your area. If you live in New York City, check out our mobile clinics serving the five boroughs."
                />
                <BehaviorTopic 
                    header="Brush Your Pet’s Teeth"
                    body=""
                    tip="Dental disease can lead to heart and kidney problems and expensive procedures. Start a dental routine to keep your pet’s teeth and gums healthy. Ask your veterinarian what products to use and how often. Don’t use toothpaste made for people, which contains fluoride and may irritate your pet's stomach."
                />
                <BehaviorTopic 
                    header="Protect Your Pet from Parasites"
                    body=""
                    tip="Flea and tick infestations can cause a host of costly medical problems from minor skin irritations to life-threatening blood loss. Stick with a topical flea and tick solution to keep the critters at bay. Make sure to only use products as directed. Never use a product intended for a dog on a cat."
                />
                <BehaviorTopic 
                    header="Toss the Cigarettes"
                    body=""
                    tip="Secondhand smoke is no joke for pets—it can cause asthma, bronchitis, lymphoma and oral, nasal and lung cancers. Quit now and you’ll save money on vet bills. At the very least, avoid smoking around your pet."
                />
                <BehaviorTopic 
                    header="Consider Pet Health Insurance"
                    body=""
                    tip="If the cost of an emergency veterinary visit or serious illness would be a financial strain, consider investing in pet health insurance while your pet is healthy. Be sure to read the fine print, though—not all plans are created equal."
                />
                <BehaviorTopic 
                    header="Buy High-Quality Pet Food"
                    body=""
                    tip="A good quality pet food—formulated under the guidelines of the American Association of Feed Control Officials—is often more cost-effective than a homemade diet. Avoid overfeeding your pet, which can lead to obesity and other health problems. "
                />
                <BehaviorTopic 
                    header="Groom Your Pets at Home"
                    body=""
                    tip="Save the price of a visit to your groomer with regular nail-trimmings and brushings. It’s good for your pet, it will reduce the amount of hair floating around your home, and your cats will have fewer hairballs. "
                />
                
            </div> 
        );
    }
    if(topic == "Spay/Neuter Your Pet") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black text-xl">By spaying or neutering your pet, you’ll help control the pet homelessness crisis. Millions of healthy dogs and cats are euthanized in the United States each year simply because there aren’t enough homes to go around. There are also medical and behavioral benefits to spaying (female pets) and neutering (male pets).</h1>
                <BehaviorTopic 
                    header="Here are some of the medical benefits"
                    body=""
                    tip="1) Your female pet will live a longer, healthier life. Spaying prevents uterine infections and decreases the incidence of breast tumors, which are malignant or cancerous in about 50 percent of dogs and 90 percent of cats. Spaying your pet before her first heat offers the best protection from these diseases.
2) Neutering your male companion prevents testicular cancer and some prostate problems."
                />
                <BehaviorTopic 
                    header="And behavioral benefits"
                    body=""
                    tip="1) Your spayed female pet won't go into heat. While cycles can vary, female felines usually go into heat four to five days every three weeks during breeding season. In an effort to advertise for mates, they'll yowl and urinate more frequently—sometimes all over the house!
2) Your male dog will be less likely to roam away from home. An intact male will do just about anything to find a mate, including finding creative ways escape from the house. Once he's free to roam, he risks injury in traffic and fights with other animals.
3) Your neutered male may be better behaved. Unneutered dogs and cats are more likely to mark their territory by spraying strong-smelling urine all over the house. Your dog might be less likely to mount other dogs, people and inanimate objects after he’s neutered. Some aggression problems may be avoided by early neutering."
                />
                <BehaviorTopic 
                    header="Spaying/neutering your pets is also highly cost-effective"
                    body=""
                    tip="The cost of your pet's spay/neuter surgery is far less than the cost of having and caring for a litter."
                />
                <BehaviorTopic 
                    header="Debunking Spay/Neuter Myths and Misconceptions"
                    body=""
                    tip="1) Spaying or neutering will not cause your pet to become overweight. Lack of exercise and overfeeding will cause your pet to pack on the extra pounds—not neutering. Your pet will remain fit and trim if you continue to provide exercise and monitor food intake.
2) Neutering is not a quick fix for all behavior problems. Although neutering your pet often reduces undesirable behaviors caused by a higher level of testosterone, there’s no guarantee that your dog’s behavior will change after he’s neutered. Although the surgery will reduce the amount of testosterone in your dog’s system, it won’t eliminate the hormone completely. Neutering will also not reduce behaviors that your pet has learned or that have become habitual. The effects of neutering are largely dependent on your dog’s individual personality, physiology and history."
                />
                <BehaviorTopic 
                    header="When to Spay or Neuter Your Pet"
                    body=""
                    tip="1) For dogs: While the traditional age for neutering is six to nine months, healthy puppies as young as eight weeks old can be neutered. Dogs can be neutered as adults as well, although there’s a slightly higher risk of post-operative complications in older dogs, dogs that are overweight or dogs that have health problems.
2) For cats: It is generally considered safe for kittens as young as eight weeks old to be spayed or neutered. To potentially avoid the start of urine spraying and eliminate the chance for pregnancy, it’s advisable to schedule the surgery before your cat reaches five months of age. It’s possible to spay a female cat while she’s in heat.
3) Talk to your veterinarian to determine the best time to spay or neuter your pet."
                />
                <BehaviorTopic 
                    header="Helping Your Pet Before and After Surgery"
                    body="Your veterinary clinic will provide pre-surgical advice that you should follow. In general, avoid giving your adult dog or cat any food after midnight the night before surgery. A puppy or kitten, however, needs adequate nutrition, and your veterinarian may advise that food not be withheld.
Your veterinarian can also provide post-operative instructions for you to follow. Although your pet may experience some discomfort after surgery, your veterinarian can take measures to control pain. Depending on the procedure performed, medication for pain may be sent home with your pet.
Here are tips for a safe and comfortable recovery:"
                    tip="1) Provide your pet with a quiet place to recover indoors and away from other animals.
2) Prevent your pet from running and jumping for up to two weeks following surgery, or as long as your veterinarian recommends.
3) Prevent your pet from licking the incision site, which may cause infection, by using a well fitted Elizabethan collar.
4) Avoid bathing your pet for at least ten days after surgery.
5) Check the incision site daily to confirm proper healing."
                />
                
            </div> 
        );
    }
    if(topic == "Emergency Care For Your Pet") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black text-xl">Unfortunately, accidents do happen. When a medical emergency befalls our furry friends, pet parents may find it difficult to make rational decisions, especially if something occurs during the middle of the night. That’s why it’s crucial to have an emergency plan in place—before you need it.</h1>
                <BehaviorTopic 
                    header="Finding 24-Hour Emergency Care for Your Pet"
                    body=""
                    tip="Talk to your veterinarian about an emergency protocol. Does your vet provide 24-hour service or does he or she work with an emergency clinic in the area? Some practices have multiple veterinarians on staff who rotate on-call services after hours. Check to see if your primary care vet has partners who might answer an emergency call. It’s also a smart idea to keep the name, number and address of your local emergency clinic tacked to the refrigerator or stored in your cell phone for easy access"
                />
                <BehaviorTopic 
                    header="Signs Your Pet May Need Emergency Care"
                    body="Your dog may need emergency care because of severe trauma—caused by an accident or fall—choking, heatstroke, an insect sting, household poisoning or other life-threatening situation. Here are some signs that emergency care is needed:"
                    tip="1) Pale gums
2) Rapid breathing
3) Weak or rapid pulse
4) Change in body temperature
5) Difficulty standing
6) Apparent paralysis
7) Loss of consciousness
8) Seizures
9) Excessive bleeding"
                />
                <BehaviorTopic 
                    header="Next Steps"
                    body="Pets who are severely injured may act aggressively toward their pet parents, so it’s important to first protect yourself from injury."
                    tip="1) For dogs: Approach your dog slowly and calmly; kneel down and say his name. If the dog shows aggression, call for help. If he’s passive, fashion a makeshift stretcher and gently lift him onto it. Take care to support his neck and back in case he’s suffered any spinal injuries.

2) For cats: Gently place a blanket or towel over the cat’s head to prevent biting; then slowly lift the cat and place her in an open-topped carrier or box. Take care to support the cat’s head and avoid twisting her neck in case she’s suffered a spinal injury.
Once you feel confident and safe transporting your pet, immediately bring him to an emergency care facility. Ask a friend or family member to call the clinic so the staff knows to expect you and your pet."
                />
                <BehaviorTopic 
                    header="First Aid Treatments to Perform At Home"
                    body="Most emergencies require immediate veterinary care, but first aid methods may help you stabilize your pet for transportation."
                    tip="1) If your pet is suffering from external bleeding due to trauma, try elevating and applying pressure to the wound.
2) If your pet is choking, place your fingers in his mouth to see if you can remove the blockage.
3) If you’re unable to remove the foreign object, perform a modified Heimlich maneuver by giving a sharp rap to his chest, which should dislodge the object."
                />
                <BehaviorTopic 
                    header="Performing CPR on Your Pet"
                    body=""
                    tip="CPR may be necessary if your pet remains unconscious after you have removed the choking object. First check to see if he’s breathing. If not, place him on his side and perform artificial respiration by extending his head and neck, holding his jaws closed and blowing into his nostrils once every three seconds. (Ensure no air escapes between your mouth and the pet’s nose.) If you don’t feel a heartbeat, incorporate cardiac massage while administering artificial respiration—three quick, firm chest compressions for every respiration—until your dog resumes breathing on his own."
                />
                <BehaviorTopic 
                    header="What To Do If Your Pet Eats Something Poisonous"
                    body=""
                    tip="If you suspect your pet has ingested a toxic substance, please call your veterinarian. Trained toxicologists will consider the age and health of your pet, what and how much he ate, and then make a recommendation—such as whether to induce vomiting—based on their assessment."
                />
            </div> 
        );
    }
    if(topic == "Finding a Lost Pet") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black text-xl">It’s every pet parent’s nightmare: Your dog or cat has gotten loose and you don’t know where he or she is. Don’t panic—there are steps you can take to locate your pet. Swift action, coupled with major neighborhood networking, will increase the odds of having your furry friend back in your arms. The key is to get the word out to as many people in as many places as possible, so don’t be shy about enlisting the help of your friends and family in the search efforts.
Remember, identification can be a lifesaver for a lost pet. It’s a good idea for all your animal companions—even indoor-only pets—to always wear a collar with an ID tag that includes your name, current phone number and any relevant contact information. If you’ve chosen to microchip your pet as a means of permanent identification, keep in mind that microchips are only as good as the information provided to the chip’s company. If you’ve moved or changed your phone number since registering your pet’s chip, be sure to submit an update as soon as possible. July 1 is National ID Your Pet Day, which serves as an annual check-in to make sure your pets’ identification information is up to date.
If your pet does go missing, below are actions you can take to begin the search process.</h1>
                <BehaviorTopic 
                    header="Search Your Home and Alert Neighbors"
                    body=""
                    tip="As soon as you notice your pet is missing, talk to your family members or housemates and ask where they last saw your pet. Search your home carefully—under beds, in closets, dark places, small places, behind bulky furniture—in case your pet may be hiding or sleeping somewhere. Shaking a food dish, treat jar or favorite toy will sometimes lure animals out of a hiding place. If you are sure your pet is not in or around the home, take a slow ride or walk around your neighborhood. Bring along a recent photo of your pet and ask neighbors if they’ve seen him or her. Check under porches and shrubs, and ask neighbors to check in sheds and garages in case your pet was accidently locked in."
                />
                <BehaviorTopic 
                    header="Work the Phones"
                    body=""
                    tip="Calls should be made to the local animal control agencies, veterinary hospitals, shelters (both municipal and private) and rescue groups in your area. One of them may already have your pet in custody. Check in with shelters daily—and pay these visits in person with photos of your pet to distribute to shelter staff. If there are no shelters close to your home, contact the police."
                />
                <BehaviorTopic 
                    header="Tell Your Social Media Networks"
                    body=""
                    tip="Send an email about your lost pet to local friends, colleagues and family members and ask them to pass on the information to anyone they can. Then, be sure to share the news with your social media networks. Most communities have local “Lost Pet” Facebook pages where they will post information about missing pets. Reach out to those page administrators and see if they will share information about your pet. You can create your own Facebook page or digital card for your lost pet and share it across your social networks—and ask friends and family to spread the word to their contacts."
                />
                <BehaviorTopic 
                    header="Create a “Lost Pet” Flyer"
                    body=""
                    tip="You’ll want to create a flyer that will stand out and get noticed by people who may have seen your pet. Repeated viewings of a consistent message are more likely to stick in people’s minds, so we recommend sticking with one design for your flyer.
Start with a big, bold headline that people can read from a distance, like “LOST DOG” or “MISSING CAT.” Include a clearly printed, recent photo of your pet and list the breed, sex, coloring, age, weight, any distinguishing features and when and where he or she was last seen. Provide your name and two phone numbers: yours and a friend or family members in case you cannot be reached."
                />
                <BehaviorTopic 
                    header="Blanket the Neighborhood"
                    body=""
                    tip="Good places to post your flyers include dog parks and runs, pet supply stores, pet grooming shops and veterinary offices. Various commercial establishments like grocery and convenience stores, gas stations, laundromats, bars, cafes and restaurants are other good high-traffic options.
Cover lampposts and trees near where you think your pet was lost, and around busy commercial and pedestrian sections of town. Put up flyers around schools or at kids’-eye level. Children can be more observant than adults, especially when it comes to animals."
                />
                <BehaviorTopic 
                    header="Don’t Give Up!"
                    body=""
                    tip="This one is important! Remember that many lost animals have found their way back home."
                />
                
            </div> 
        );
    }
    if(topic == "End Of Life Care") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black text-xl">Coping with the impending loss of a pet is one of the most difficult experiences a pet parent will face. Whether your furry friend is approaching his golden years or has been diagnosed with a terminal illness, it’s important to calmly guide the end-of-life experience and minimize any discomfort or distress. As your pet’s health declines, you may elect to care for your pet at home—with the supervision of a veterinarian—or you may decide to end his suffering with euthanasia.
                Read on to find out how to help make your pet’s final days peaceful and dignified.</h1>
                <BehaviorTopic 
                    header="Is Your Pet In Pain?"
                    body=""
                    tip="When cats and dogs are suffering, they may not show outward signs that we normally associate with pain like whimpering or crying. Sometimes an animal will continue to eat or drink in spite of pain or disorientation. Some physiological and behavioral signs that your pet might be experiencing pain include excessive panting or gasping for breath, reclusiveness, reluctance to move and food pickiness."
                />
                <BehaviorTopic 
                    header="Caring for an Elderly Pet"
                    body="The most important thing you can do for your elderly pet is to minimize any pain or distress she’s experiencing."
                    tip="1) Consult with your veterinarian and treat any health problems, since undiagnosed issues can cause discomfort and rapid deterioration.
2) Surround her with her favorite things, like a warm blanket or special squeaky toy.
3) Since pressure sores can develop in pets with limited mobility, it’s also essential to provide a warm sleeping spot with plenty of cushioning.
4) Some older pets may develop incontinence, or the loss of bladder control, so be sure to check your furry friend regularly for any wetness or soiling. If your pet needs help getting up to urinate or defecate, you can purchase a sling or use a large towel to wrap under her body and assist her."
                />
                <BehaviorTopic 
                    header="Pet Hospice Care"
                    body=""
                    tip="Pet hospice care, also known as palliative care, is an option if your pet is suffering from a terminal illness and a cure is not possible. The goal is to make a pet’s final days or weeks more pleasant with the proper use of pain medications, dietary strategies and human interaction. Pet hospice is not a place, but a personal choice and philosophy based on the principle that death is a part of life and can be dignified. When considering hospice care, pet parents should very careful not to prolong the suffering of pets who are in pain or experiencing poor quality of life.
A participating veterinarian will teach pet parents how to provide intensive home care to keep an ill pet as comfortable as possible. Hospice care requires an active commitment and constant supervision from pet parents, who work with their veterinary team to make sure their pet’s life ends comfortably. If you decide hospice care is the right course for you and your pet, you will become your pet’s primary nurse and caregiver, as well as the link between your pet and the veterinary team. Consult with your primary veterinarian and see if she recommends hospice care for your pet based on his specific needs."
                />
                <BehaviorTopic 
                    header="Considering Euthanasia"
                    body=""
                    tip="Euthanasia provides a painless, peaceful end for a pet who would otherwise continue to suffer. Your veterinarian has special training to provide your pet with a humane and gentle death. During the procedure, your vet will inject your pet with a sedative followed by a special medication. The animal experiences no awareness of the end of life—the process is akin to undergoing general anesthesia for a surgical procedure and takes about 10 to 20 seconds.
Your veterinarian is the best person to advise you on when the time is right to euthanize—information from medical tests is often more accurate than what a pet owner can observe, and pet owners often delay the moment of euthanasia in anticipation of grief. Observing and keeping an accurate record of your pet in his daily activities can help you to decide. If you observe that moments of discomfort outweigh his capacity to enjoy life, it is time to euthanize, even if your pet still experiences pleasure in eating or socializing. If your pet is in pain, your main goal should be to minimize his suffering."
                />
                <BehaviorTopic 
                    header="What to Do If Your Pet Has Died at Home"
                    body="If your pet is under the care of a veterinarian at the time of his or her passing, he or she can guide you through next steps. However, if your pet dies in your home, there are options to consider. Whether you simply want the body to be removed from your home, or you wish to permanently memorialize your pet in some special way, the choice is yours."
                    tip="1) Depending on your decision, you may have to keep the body in your home for a short period of time. A well-cooled body can be held for up to 24 hours, but the sooner it can be taken somewhere else, the better.
2) Placing the wrapped animal in a refrigerator or freezer is recommended, with one exception—if you plan to have a necropsy (autopsy) performed to determine cause of death, the body should not be frozen (refrigeration is still okay). It is essential that you contact a veterinarian as soon as possible if you would like a necropsy.
3) If the animal is too big to be put into a refrigerator or freezer, the body should be placed on a cement floor or concrete slab, which is the best way to draw heat away from the carcass. Do not cover or wrap the body in this instance. Doing so will trap in heat and not allow the body temperature to cool.
4) As a last resort, you may keep the body in the coldest area of your home, out of the sun, packed with bags of ice. In this case, the body should be placed in a plastic bag to prevent it from getting wet."
                />
                <BehaviorTopic 
                    header="Pet Cremation and Burial"
                    body=""
                    tip="It is very common for pet owners to have their deceased pets cremated. You need to decide if you wish to keep your pet's ashes as a remembrance. If so, you will want to arrange an individual (or private) cremation, meaning that your pet will be cremated alone. Businesses that offer individual cremation commonly offer home pick-up/delivery of remains as part of their service packages.
Depending on local laws, it may be legal to bury an animal on your own property. It is typically illegal to bury an animal on public lands such as parks. If you desire burial for your pet but do not have land of your own, check to see if there is a pet cemetery or memorial park in your area."
                />
                <BehaviorTopic 
                    header="Other Options"
                    body=""
                    tip="If you wish to simply have your pet’s body removed from your home, consult your local government to find out if your sanitation department picks up animal remains."
                />
                <BehaviorTopic 
                    header="Dealing with Pet Loss"
                    body=""
                    tip="There are many forms of grief that are completely normal in the wake of the loss of a beloved pet. It can help to memorialize your pet in a way that includes others who cared about him or her. Friends and family can help form a support network. If severe symptoms of grief persist, it is best to consult with your doctor about your feelings and ways to cope with this loss."
                />
                
            </div> 
        );
    }
    if(topic == "Vaccinations for Your Pet") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black text-xl">Vaccines help prevent many illnesses that affect pets. Vaccinating your pet has long been considered one of the easiest ways to help him live a long, healthy life. Not only are there different vaccines for different diseases, there are different types and combinations of vaccines. Vaccination is a procedure that has risks and benefits that must be weighed for every pet relative to his lifestyle and health. Your veterinarian can determine a vaccination regime that will provide the safest and best protection for your individual animal.</h1>
                <BehaviorTopic 
                    header="Understanding Vaccines"
                    body=""
                    tip="Vaccines help prepare the body's immune system to fight the invasion of disease-causing organisms. Vaccines contain antigens, which look like the disease-causing organism to the immune system but don't actually cause disease. When the vaccine is introduced to the body, the immune system is mildly stimulated. If a pet is ever exposed to the real disease, his immune system is now prepared to recognize and fight it off entirely or reduce the severity of the illness."
                />
                <BehaviorTopic 
                    header="Core Vaccines"
                    body="Core vaccines are considered vital to all pets based on risk of exposure, severity of disease or transmissibility to humans."
                    tip="1) For Dogs: Vaccines for canine parvovirus, distemper, canine hepatitis and rabies are considered core vaccines. Non-core vaccines are given depending on the dog’s exposure risk. These include vaccines against Bordetella bronchiseptica, Borrelia burgdorferi and Leptospira bacteria.
2) For Cats: Vaccines for panleukopenia (feline distemper), feline calicivirus, feline herpesvirus type I (rhinotracheitis) and rabies are considered core vaccines. Non-core vaccines are given depending on the cat's lifestyle; these include vaccines for feline leukemia virus, Bordetella, Chlamydophila felis and feline immunodeficiency virus.
3) Your veterinarian can determine what vaccines are best for your pet."
                />
                <BehaviorTopic 
                    header="Determining the Timing and Frequency of Vaccinations"
                    body="Your veterinarian can best determine a vaccination schedule for your pet. This will depend on the type of vaccine, your pet’s age, medical history, environment and lifestyle."
                    tip="1) For puppies: If his mother has a healthy immune system, a puppy will most likely receive antibodies in mother’s milk while nursing. Puppies should receive a series of vaccinations starting at six to eight weeks of age. A veterinarian should administer a minimum of three vaccinations at three- to four-week intervals. The final dose should be administered at 16 weeks of age.
2) For adult dogs: Some adult dogs might receive certain vaccines annually, while other vaccines might be given every three years or longer.
3) For kittens: Kittens automatically receive antibodies in the milk their mother produces if their mother has a healthy immune system. When the kitten is around six to eight weeks of age, your veterinarian can begin to administer a series of vaccines at three- or four-week intervals until the kitten reaches 16 weeks of age.
4) For adult cats: Adult cats might be revaccinated annually or every three years."
                />
                <BehaviorTopic 
                    header="Local Laws Regarding Mandatory Vaccines"
                    body=""
                    tip="Each state has its own laws governing the administration of the rabies vaccine. Some areas require yearly rabies vaccination. Other areas call for vaccines every three years. In almost all states, proof of rabies vaccination is mandatory."
                />
                <BehaviorTopic 
                    header="Risks Associated with Vaccination"
                    body=""
                    tip="Immunizations should mildly stimulate the animal’s immune system in order to create protection from specific infectious diseases. This stimulation can create mild symptoms, ranging from soreness at the injection site to fever and allergic reactions."
                />
                
            </div> 
        );
    }
}