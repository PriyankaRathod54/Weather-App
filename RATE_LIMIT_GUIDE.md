# 🚨 Rate Limit Guide - Weather Master

## Understanding Rate Limits

The weatherstack API has rate limiting based on your subscription plan:

### Free Plan Limits
- **25 requests per month**
- Perfect for testing and low-usage applications
- Good for small personal projects

### How Rate Limiting Works
When you reach your limit, the API returns error code **104** with the message:
```
"You have exceeded the maximum rate limitation allowed on your subscription plan."
```

## ✅ Built-In Solutions

The Weather Master app now includes **4 powerful features** to prevent and manage rate limits:

### 1. 🗂️ Automatic Caching System

**What It Does:**
- Stores API responses for 1 hour
- Reuses cached data instead of making new API calls
- Saves your rate limit requests

**How It Works:**
- First search for "London" = 1 API call (data cached)
- Second search for "London" = 0 API calls (served from cache)
- You see "Loaded from cache" message

**Benefits:**
- Same location searches are free after first request
- Faster response times
- Dramatically reduces API usage

### 2. ⏱️ Request Debouncing

**What It Does:**
- Delays search requests by 800 milliseconds
- Prevents accidentally sending multiple requests
- Cancels pending requests if you keep typing

**How It Works:**
- You type: "L-o-n-d-o-n"
- App waits 800ms after you stop typing
- Then sends just ONE request for "London"
- NOT five separate requests for "L", "Lo", "Lon", "Lond", "Londo"

**Benefits:**
- Reduces accidental duplicate API calls
- Saves your rate limit quota
- Smoother user experience

### 3. ⏱️ Rate Limit Detection

**What It Does:**
- Detects when you hit the rate limit
- Shows countdown timer
- Prevents further API calls for 1 minute
- Helpful tips for reducing usage

**How It Works:**
When rate limited:
1. Yellow warning banner appears
2. Countdown timer shows how long to wait
3. App automatically retries after 1 minute
4. Tips suggest ways to reduce API calls

### 4. 💡 User-Friendly Error Messages

**What It Does:**
- Clear, helpful error messages
- Suggests solutions
- No confusing technical jargon

**Examples:**
```
❌ Rate limit exceeded. Your free plan has limited requests. 
   Please wait 1 minute before trying again, 
   or upgrade your plan for higher limits.
```

## 📊 How to Use Wisely

### ✅ Good Practices

#### 1. **Reuse the Same Location**
```
Search "London" once → cached
View all tabs (Current, Forecast, etc.) → no new API calls
Perfect workflow!
```

#### 2. **Plan Your Searches**
```
Instead of: Search "London", search "Paris", search "Tokyo"
After 1st month limit reached - stuck!

Do: Search the 5 locations you need for the month
Cache stores them for free reuse
```

#### 3. **Different Locations**
```
Free plan = 25 requests per month = ~5-6 different locations
Plan accordingly!
```

#### 4. **Use Tabs Without Searching**
```
Search "London" once
Switch between tabs: Current → Forecast → Historical → Marine
All views use cached data - NO extra calls!
```

### ❌ Avoid

#### 1. **Rapid Repeated Searches**
```
❌ DON'T: Search "London" → Search "London" → Search "London"
✅ DO: Search "London" once, use cached data
```

#### 2. **Typing Each Letter**
```
❌ DON'T: Type slowly "L...o...n...d...o...n"
(app sends request for each letter due to typing)

✅ DO: Type normally "London"
(app waits for you to stop, sends 1 request)
```

#### 3. **Forgetting to Wait**
```
❌ DON'T: Hit rate limit, immediately search again
✅ DO: See countdown timer, wait 60 seconds, try again
```

#### 4. **Switching Locations Constantly**
```
❌ DON'T: Search 30 different cities to browse
(exhausts free plan instantly)

✅ DO: Focus on locations you actually need
```

## 💾 Cache Information

### What Gets Cached?
- ✅ Current weather data
- ✅ Forecast data
- ✅ Historical weather data
- ✅ Marine data
- ✅ All responses from the API

### Cache Details
- **Size**: Up to 50 different locations
- **Duration**: 1 hour per entry
- **Expiration**: Automatically removes old data

### Cache Info Banner
When "Loaded from cache" appears:
- 💾 Shows data came from cache
- ✅ No API call was made
- 📉 Your rate limit quota is preserved

## 🚀 What to Do When Rate Limited

### Immediate Steps
1. **Wait**: See the countdown timer
2. **Don't panic**: You haven't broken anything
3. **Read tips**: Banner shows helpful suggestions
4. **Wait 60 seconds**: Timer automatically resets

### Next Time
1. **Plan locations**: Decide which cities to search
2. **Use existing searches**: Reuse cached results
3. **Switch tabs**: View different data types without new searches
4. **Upgrade (Optional)**: Use paid plan for more requests

### Tips Shown on Rate Limit
```
💡 Tips to reduce API calls:
• Cached results are reused automatically
• Switch between tabs without searching to view different data
• Use the same location multiple times (no extra cost)
• Consider upgrading to a higher tier plan for more requests
```

## 📈 Optimization Strategies

### Strategy 1: Morning Planning
```
1. Start of day: Search 5-6 locations you'll check all month
2. Results cached for 1 hour
3. Rest of month: Switch between them freely
4. Save most of rate limit for unexpected needs
```

### Strategy 2: Daily Favorites
```
1. Choose 3-4 favorite cities
2. Search them every morning (cached most of time)
3. Only search new cities when needed
4. Stays under 25 request monthly limit
```

### Strategy 3: Tab Browsing
```
1. Search location ONCE → Current weather loads
2. Click "Forecast" tab → same location, no new call
3. Click "Historical" tab → same location, no new call
4. Click "Marine" tab → same location, no new call
You made 1 API call but saw 4 types of data!
```

## 🔄 API Call Counter

Each type of data is separate:
```
- Current Weather = 1 call per location
- Forecast = 1 call per location  
- Historical = 1 call per location/date
- Marine = 1 call per location

Total: 1 call per location (all cached together)
```

## 💳 Upgrade Options

If 25 requests aren't enough:

| Plan | Requests/Month | Best For |
|------|----------------|----------|
| **Free** | 25 | Testing, learning |
| **Professional** | 50,000+ | Production apps |

Visit: https://apilayer.com/weatherstack/pricing

## 🔍 Troubleshooting

### I see "Rate limit exceeded" immediately
**Cause**: You've used all 25 requests this month

**Solution**: 
- Wait until next month resets
- Upgrade to paid plan
- Use cached results instead

### I searched the same city twice and got charged twice
**Cause**: Likely outside 1-hour cache window or cache cleared

**Solution**:
- Searches within 1 hour are cached
- Clear browser cache less frequently
- Plan searches in batches

### How do I know if data is cached?
**Solution**:
- Look for "💾 Loaded from cache" banner
- Data loads instantly = probably cached
- No banner = first search for that location

## 📱 Mobile Optimization

Mobile users face tighter limits. Best practices:

1. **Save locations**: Remember your searches
2. **Minimize searches**: Only when needed
3. **Use tabs**: View all data without new searches
4. **Plan ahead**: Don't browse casually

## ⚡ Pro Tips

### Tip 1: Bookmark Frequently Used Locations
```
Always search same 5 cities?
Add them to favorites (future feature)
Or screenshot the quick buttons
```

### Tip 2: Schedule Your Searches
```
Check weather same time daily?
Set reminder to avoid duplicate searches
Use cached data throughout the day
```

### Tip 3: Share Results
```
Avoid redundant searches
Share weather screenshots with friends
Instead of them searching too
```

### Tip 4: Use Quick Buttons
```
London, New York, Tokyo, Paris = pre-set
Click for instant cached results
No typing = faster + no typos
```

## 🎯 Real-World Examples

### Example 1: Weekend Planner
```
Monday: Search "Paris" (1 call)
        Search "Berlin" (1 call)  
        Search "London" (3 calls total)
Tuesday-Sunday: Just switch tabs for all 3 cities
                 Uses cache, 0 new calls!
Month total: 3 calls (way under 25 limit!)
```

### Example 2: Traveler
```
Travel to 6 countries this month
Budget: ~25/6 = 4 requests per country
Search country once → view all data types
Check multiple days without re-searching
Plan ahead to stay under limit
```

### Example 3: Weather Enthusiast  
```
Want to monitor 25 different locations
Monthly budget allows exactly this
Search each location once per month
Use cache the rest of the time
Perfect fit!
```

## 📞 Need Help?

If you experience issues:

1. **Check cache status**: See "Loaded from cache" banner
2. **Wait 1 minute**: If rate limited
3. **Clear browser cache**: (Clears cached data, use carefully)
4. **Check API docs**: https://docs.apilayer.com/weatherstack

## 🎉 Summary

| Feature | Benefit |
|---------|---------|
| 🗂️ Caching | Save API calls |
| ⏱️ Debouncing | Prevent accidental calls |
| 🚨 Detection | Know when limited |
| 💡 Tips | Guidance when stuck |

**Result**: Use your 25 free requests wisely and never run out! 🎯

---

**Remember**: 
- ✅ One search per location = cached forever (1 hour)
- ✅ Switch tabs on same location = no new calls
- ✅ Plan your searches = stay under limit
- ✅ Wait if rate limited = automatic after 60s

**Happy weather tracking!** 🌤️
