You never write a /login controller.
Spring Security intercepts the request before it ever reaches Spring MVC.

Think of it like this:

Browser
  ↓
Spring Security Filters   ← /login is caught here
  ↓
AuthenticationManager
  ↓
AuthenticationProvider
  ↓
UserDetailsService (YOUR CODE)
  ↓
Database


Who handles /login?
Answer: UsernamePasswordAuthenticationFilter

Spring Security has a filter chain. One of those filters is:

UsernamePasswordAuthenticationFilter


By default, it is hard-wired to:

POST /login


You do NOT configure this route in a controller.




What happens when user hits POST /login?
Step-by-step
✅ Step 1: Filter catches it

UsernamePasswordAuthenticationFilter sees:

POST /login  → matches loginProcessingUrl


So it intercepts the request.
✅ Step 2: Username & password extracted

Internally:

String username = request.getParameter("username");
String password = request.getParameter("password");

Step 3: Authentication object created
UsernamePasswordAuthenticationToken authToken =
    new UsernamePasswordAuthenticationToken(username, password);


This token is NOT authenticated yet.

Step 4: AuthenticationManager is called
authenticationManager.authenticate(authToken);


This is the central brain.AuthenticationManager → AuthenticationProvider

Spring Security now asks:

“Who can authenticate a username + password?”

Answer:
👉 DaoAuthenticationProvider

THIS is where CustomUserDetailsService is used

Inside DaoAuthenticationProvider 👇

UserDetails userDetails =
    userDetailsService.loadUserByUsername(username);


🔥 THIS IS THE MOMENT YOUR DB IS HIT

So:

Spring does NOT know your DB

It only knows: “Ask UserDetailsService”

Your implementation decides where data comes from

Who checks the password?

NOT YOU.

After UserDetails is returned:

passwordEncoder.matches(rawPassword, storedHashedPassword)


Configured here:

@Bean
PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

8️⃣ What if authentication succeeds?

Spring Security:

Marks the Authentication object as authenticated

Stores it in SecurityContext

Creates a session (or JWT if stateless)

User is now LOGGED IN

9️⃣ Why CustomUserDetailsService is MANDATORY

Without it:

Spring has no idea how to fetch users

Only options left:

InMemoryUserDetailsManager

Hardcoded users

That’s why DB authentication is impossible without it.

10️⃣ TL;DR (core truth)

/login is NOT a controller route

It is intercepted by Spring Security filter

Filter → AuthenticationManager → DaoAuthenticationProvider

Provider → loadUserByUsername()

Your DB logic lives ONLY there