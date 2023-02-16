import { ethers } from "./ethers-5.2-esm.min.js"
import { abi, contractaddress } from "./abi.js"
const connectbutton = document.getElementById("connectbutton")
const Fundbutton = document.getElementById("Fundbutton")
const inputethamount = document.getElementById("ethamountinput")
const shower = document.getElementById("shower")
const confirmation = document.getElementById("confirmation")
const withdrawbtton = document.getElementById("withdrawbtton")
withdrawbtton.onclick = Withdraw
shower.onclick = show
connectbutton.onclick = connect
Fundbutton.onclick = fundme

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        window.ethereum.request({ method: "eth_requestAccounts" })
        connectbutton.innerHTML = window.ethereum.selectedAddress
    } else {
        connectbutton.innerHTML = "Please install metamask or any othe wallet "
    }
}
async function show() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const Balance = await provider.getBalance(contractaddress)

        confirmation.innerHTML = Balance.toString()
    }
}
async function fundme() {
    if (typeof window.ethereum !== "undefined") {
        const ethamount = inputethamount.value
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contractfundme = new ethers.Contract(contractaddress, abi, signer)
        try {
            const transactionresponse = await contractfundme.fund({
                value: ethers.utils.parseEther(ethamount),
            })
            await listentotransaction(transactionresponse, provider)
            confirmation.innerHTML = "Transaction is completed"
        } catch (e) {
            console.log(e)
        }
    } else {
    }
}
async function Withdraw() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contractfundme = new ethers.Contract(contractaddress, abi, signer)
        try {
            const transactionresponse = await contractfundme.withdraw()
            await listentotransaction(transactionresponse, provider)
            confirmation.innerHTML = "Withdrawn is completed"
        } catch (e) {
            console.log(e)
        }
    }
}
async function listentotransaction(transactionresponse, provider) {
    return new Promise((resolve, reject) => {
        provider.once(transactionresponse.hash, (transactionReciept) => {
            // console.log(`completed with ${transactionReciept.confirmations}`)
            resolve()
        })
    })
}
