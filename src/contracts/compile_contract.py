from pyteal import *

from pet_shop_contract import PetShop

if __name__ == "__main__":
    approval_program = PetShop().approval_program()
    clear_program = PetShop().clear_program()

    # Mode.Application specifies that this is a smart contract
    compiled_approval = compileTeal(approval_program, Mode.Application, version=6)
    print(compiled_approval)
    with open("pet_shop_approval.teal", "w") as teal:
        teal.write(compiled_approval)
        teal.close()

    # Mode.Application specifies that this is a smart contract
    compiled_clear = compileTeal(clear_program, Mode.Application, version=6)
    print(compiled_clear)
    with open("pet_shop_clear.teal", "w") as teal:
        teal.write(compiled_clear)
        teal.close()
