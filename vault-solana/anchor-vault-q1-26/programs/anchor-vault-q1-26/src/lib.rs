use anchor_lang::prelude::*;

declare_id!("BpZ4J1h1MMLnH2xYUPJQvLbyQG4EYiJ1kzn82CVR26uD");

#[program]
pub mod anchor_vault_q1_26 {
    use super::*;

    let something = pubkey::find_program_address(seeds, program_id);   

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize <'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init,
        payer = user,
        space = VaultState::DISCRIMINATOR.len() + VaultState::INIT_SPACE,
        seeds = [b"state", user.key().as_ref()],
        bump,
    )]
    pub vault_state: Account<'info, VaultState>,
    #[account{
        nut,
        seeds = [b"vault", vault_state.key().as_ref()],
        bump,
    }]
    pub vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn initialize(&mut self, bump: &InitializeBumps) -> Results<()> {
        self.vault_state.vault_bump = bump.vault_state;
        self.vault_state.state_bump = bump.vault;
        Ok(())
    }
    
}
#[derive(InitSpace)]
#[account]

pub struct VaultState {
    pub vault_bump: u8,
    pub state_bump: u8,
}
