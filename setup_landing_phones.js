// Script para actualizar títulos de landing_phones en Supabase
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://slrzlggigpiinswjfvxr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNscnpsZ2dpZ3BpaW5zd2pmdnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTkyOTQsImV4cCI6MjA3MzQzNTI5NH0.sIx1NtdC92TJYOumnDPs-J6zDFz6vjQamOmfxa0AK5c';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateTitles() {
  try {
    console.log('🔧 Actualizando títulos de landings...');
    
    // Títulos atractivos para cada landing
    const titles = {
      1: '🎰 CASINO PREMIUM 1XCLUB 🎰',
      2: '💬 CHAT DIRECTO 1XCLUB 💬', 
      3: '🔥 CASINO 24ENVIVO 🔥',
      4: '⚡ REGISTRO RÁPIDO 24ENVIVO ⚡'
    };
    
    // Actualizar cada título
    for (const [landingNumber, title] of Object.entries(titles)) {
      const { data, error } = await supabase
        .from('landing_phones')
        .update({ 
          individual_title: title,
          use_individual_settings: true 
        })
        .eq('landing_number', parseInt(landingNumber));
      
      if (error) {
        console.error(`❌ Error al actualizar landing ${landingNumber}:`, error.message);
      } else {
        console.log(`✅ Landing ${landingNumber} actualizada: ${title}`);
      }
    }
    
    // Verificar los cambios
    const { data: finalData, error: finalError } = await supabase
      .from('landing_phones')
      .select('landing_number, individual_title, use_individual_settings, is_active')
      .in('landing_number', [1, 2, 3, 4])
      .order('landing_number');
    
    if (finalError) {
      console.error('❌ Error al verificar datos:', finalError.message);
    } else {
      console.log('\n📊 Títulos actualizados:');
      finalData.forEach(item => {
        console.log(`Landing ${item.landing_number}: ${item.individual_title}`);
      });
    }
    
    console.log('\n🎉 Títulos actualizados correctamente!');
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

updateTitles();