// auth.ts
import NextAuth from "next-auth"
import type { OAuth2Config, Provider } from "next-auth/providers"
import { customFetch } from "@auth/core"

const CustomTikTok: OAuth2Config<any> & Provider = {
  id: "tiktok",
  name: "TikTok",
  type: "oauth",
  // Ponto-chave: habilitar explicitamente PKCE e state
  checks: ["pkce", "state"],
  client: {
    token_endpoint_auth_method: "client_secret_post",
  },
  authorization: {
    url: "https://www.tiktok.com/v2/auth/authorize",
    params: {
      client_key: process.env.AUTH_TIKTOK_ID,
      scope: "user.info.basic,video.list",
      response_type: "code",
    },
  },
  token: "https://open.tiktokapis.com/v2/oauth/token/",
  userinfo: "https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name",
  async [customFetch](...args) {
    const url = new URL(args[0] instanceof Request ? args[0].url : args[0])
    if (url.pathname.endsWith("/token/")) {
      const [requestUrl, request] = args
      const customBody = new URLSearchParams(request?.body as string)
      customBody.append("client_key", process.env.AUTH_TIKTOK_ID!)
      return fetch(requestUrl, {
        ...request,
        headers: {
          ...Object.fromEntries(new Headers(request?.headers).entries()),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: customBody.toString(),
      })
    }
    return fetch(...args)
  },
  profile(profile) {
    return {
      id: profile.data.user.open_id,
      name: profile.data.user.display_name,
      image: profile.data.user.avatar_url,
    }
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [CustomTikTok],
})