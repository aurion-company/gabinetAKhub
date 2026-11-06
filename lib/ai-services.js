/**
 * Módulo de Serviços de IA, Pesquisa e Conectividade Externa
 * GabinetAK HUB
 */

// 1. Pesquisa Web em Tempo Real com Tavily AI
export async function searchTavily(query, maxResults = 4) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: 'basic',
        include_answer: true,
        max_results: maxResults
      })
    });

    if (!res.ok) return null;
    const data = await res.json();
    return {
      answer: data.answer,
      results: data.results?.map(r => ({
        title: r.title,
        url: r.url,
        content: r.content
      }))
    };
  } catch (err) {
    console.error('Erro na busca Tavily:', err.message);
    return null;
  }
}

// 2. Radar de Notícias em Tempo Real com GNews
export async function fetchGNews(topic = 'politica DF', max = 5) {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return null;

  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(topic)}&lang=pt&country=br&max=${max}&apikey=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.articles?.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      publishedAt: a.publishedAt,
      source: a.source?.name
    }));
  } catch (err) {
    console.error('Erro no GNews:', err.message);
    return null;
  }
}

// 3. Clima e Defesa Civil com OpenWeather
export async function fetchWeatherCity(cityName = 'Brasília') {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) return null;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)},BR&units=metric&lang=pt_br&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      cidade: data.name,
      temperatura: Math.round(data.main?.temp),
      sensacao: Math.round(data.main?.feels_like),
      descricao: data.weather?.[0]?.description,
      umidade: data.main?.humidity,
      ventoKm: Math.round((data.wind?.speed || 0) * 3.6)
    };
  } catch (err) {
    console.error('Erro OpenWeather:', err.message);
    return null;
  }
}

// 4. Síntese de Voz com ElevenLabs
export async function synthesizeVoiceElevenLabs(text, voiceId = '21m00Tcm4TlvDq8ikWAM') {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    return Buffer.from(buffer);
  } catch (err) {
    console.error('Erro ElevenLabs:', err.message);
    return null;
  }
}
