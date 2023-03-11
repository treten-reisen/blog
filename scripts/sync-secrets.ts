// Import the client
import { GoogleAuth, SecretManager } from "https://googleapis.deno.dev/v1/secretmanager:v1.ts"

// Read the service account key.
const credentialsPath = Deno.env.get("GCLOUD_CREDENTIALS_FILE")
if (!credentialsPath) throw new Error("Environment variable 'GCLOUD_CREDENTIALS_FILE' not set!")

const credentialsFile = await import(credentialsPath, {
  assert: { type: "json" },
})
const auth = new GoogleAuth().fromJSON(credentialsFile)

// Instantiate the client.
const secretmanager = new SecretManager(auth)

// List Spanner instances.
const instances = await secretmanager.projectsSecretsList("projects/treten-reisen")
console.log(instances)
