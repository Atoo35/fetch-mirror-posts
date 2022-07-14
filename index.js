const axios = require('axios');
arweaveURL = "https://arweave.net";
const fetchTransactions = async (address) => {
  try {
    const result = await axios.post(
      `${arweaveURL}/graphql`,
      {
        query: `
                {
                  transactions(
                      tags:[
                        {
                          name:"App-Name",
                          values:["MirrorXYZ"],
                        },
                        {
                          name:"Contributor",
                          values:["${address}"]
                        }
                      ]
                  sort:HEIGHT_DESC) {
                      edges {
                          node {
                              id
                          }
                      }
                  }
              }
                `
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return result.data.data
  } catch (err) {
    console.log(err);
  }
}

const fetchArweaveTransactionData = async (transactionId) => {
  try {
    const response = await axios.get(`https://arweave.net/${transactionId}`)
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


const main = async () => {
  const response = await fetchTransactions("0x9651B2a7Aa9ed9635cE896a1Af1a7d6294d5e902")
  console.log(response.transactions.edges)
  const post = await fetchArweaveTransactionData(response.transactions.edges[3].node.id)
  console.log(post)
}

main()
  .then(() => process.exit(0))