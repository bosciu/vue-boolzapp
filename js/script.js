/* scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina) */

const scrollToLastMessage = () => {
    const messagesList = document.getElementsByClassName("message");
    messagesList[messagesList.length - 1].scrollIntoView();
};
const reduceHour = () => {
    return parseInt(dayjs().format("HH")) - 3;
};

const app = new Vue({
    el: "#root",
    data: {
        contacts: [{
                name: "Michele",
                avatar: "_1",
                visible: true,
                messages: [{
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 16:15:22",
                        text: "Tutto fatto!",
                        status: "received"
                    },
                    {
                        date: dayjs().format(
                            "DD/MM/YYYY " + reduceHour() + ":mm:ss"
                        ),
                        text: 'Messaggio per ultimo accesso "oggi"',
                        status: "received"
                    }
                ]
            },
            {
                name: "Fabio",
                avatar: "_2",
                visible: true,
                messages: [{
                        date: "20/03/2020 16:30:00",
                        text: "Ciao come stai?",
                        status: "sent"
                    },
                    {
                        date: "20/03/2020 16:30:55",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received"
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent"
                    }
                ]
            },
            {
                name: "Samuele",
                avatar: "_3",
                visible: true,
                messages: [{
                        date: "28/03/2020 10:10:40",
                        text: "La Marianna va in campagna",
                        status: "received"
                    },
                    {
                        date: "28/03/2020 10:20:10",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent"
                    },
                    {
                        date: "28/03/2020 16:15:22",
                        text: "Ah scusa!",
                        status: "received"
                    }
                ]
            },
            {
                name: "Luisa",
                avatar: "_4",
                visible: true,
                messages: [{
                        date: "10/01/2020 15:30:55",
                        text: "Lo sai che ha aperto una nuova pizzeria?",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received"
                    }
                ]
            }
        ],
        selectedContact: 0,
        outgoingMessage: "",
        searchField: "",
        optionVisible: false
    },
    methods: {
        setSelectedContact: function(index) {
            this.selectedContact = index;
        },
        getContactImage: function(contactIndex) {
            return `img/avatar${this.contacts[contactIndex].avatar}.jpg`;
        },
        getActiveContactImage: function() {
            return `img/avatar${
				this.contacts[this.selectedContact].avatar
			}.jpg`;
        },
        getLastMessage: function(contactIndex) {
            const lastUserMessages = this.contacts[contactIndex].messages;

            const lastUserMessage =
                lastUserMessages[lastUserMessages.length - 1].text;
            if (lastUserMessage.length < 30) {
                return lastUserMessage;
            } else {
                return `${lastUserMessage.substring(0, 30)}...`;
            }
        },
        getLastMessageDate: function(contactIndex) {
            const lastUserMessages = this.contacts[contactIndex].messages;

            return lastUserMessages[lastUserMessages.length - 1].date;
        },
        lastAccessCompiler: function() {
            const lastUserMessages =
                this.contacts[this.selectedContact].messages;
            const lastReceivedMessage = lastUserMessages.filter(
                (element) => element.status == "received"
            );
            const strings =
                lastReceivedMessage[lastReceivedMessage.length - 1].date.split(
                    " "
                );
            if (strings[0] == dayjs().format("DD/MM/YYYY")) {
                return `Ultimo accesso oggi alle ${strings[1]}`;
            } else {
                return `Ultimo accesso il ${strings[0]} alle ${strings[1]}`;
            }
        },
        messageSend: function() {
            if (this.outgoingMessage.trim().length > 0) {
                this.contacts[this.selectedContact].messages.push({
                    date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                    text: this.outgoingMessage,
                    status: "sent"
                });
                this.outgoingMessage = "";
                setTimeout(() => {
                    this.contacts[this.selectedContact].messages.push({
                        date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                        text: "ok",
                        status: "received"
                    });
                }, 1000);
            }
        },
        searchContact: function() {
            this.contacts.forEach((element) => {
                if (
                    element.name
                    .toLowerCase()
                    .startsWith(this.searchField.toLowerCase())
                ) {
                    element.visible = true;
                } else element.visible = false;
            });
        },
        optionToggle: function(index) {
            const dropdowns =
                document.getElementsByClassName("option-dropdown");
            this.optionVisible = !this.optionVisible;
            if (dropdowns[index].className == "option-dropdown") {
                dropdowns[index].classList.add("display-inline-block");
            } else if (
                dropdowns[index].className ==
                "option-dropdown display-inline-block"
            ) {
                dropdowns[index].className = "option-dropdown";
            }
        },
        messageInfo: function(index) {
            alert(
                `Il messaggio dice: ${
					this.contacts[this.selectedContact].messages[index].text
				}
                
                Ricevuto alle ${
					this.contacts[this.selectedContact].messages[index].date
				}`
            );
        },
        deleteMessage: function(index) {
            document.getElementsByClassName("message")[index].style.display =
                "none";
            this.optionVisible = !this.optionVisible;
        }
    },
    mounted: function() {
        scrollToLastMessage();
    },
    updated: function() {
        scrollToLastMessage();
    }
});